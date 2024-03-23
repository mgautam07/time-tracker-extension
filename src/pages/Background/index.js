import dayjs from "dayjs"

let time = new Date().getTime();
let data = {};
let prevUrl = 'newtab';

// initialize database
// chrome.runtime.onConnect.addListener(function() {
const request = indexedDB.open('tte', 2);
request.onerror = (event) => {
  console.error("Why didn't you allow my web app to use IndexedDB?!");
};

// This event is only implemented in recent browsers
request.onupgradeneeded = (event) => {
  // Save the IDBDatabase interface
  const db = event.target.result;

  // Create an objectStore for this database
  const objectStore = db.createObjectStore('time', { keyPath: 'date' });
  objectStore.createIndex('date', 'date', { unique: true });
};

// function to update data and url

function urlChange(newUrl) {
  if (newUrl === undefined || (prevUrl === '' && newUrl === '')) {
    return;
  }
  if (prevUrl === '') {
    prevUrl = newUrl.split('/')[2];
    time = new Date().getTime();
    return;
  }
  const endTime = new Date().getTime();
  if (data[prevUrl] >= 1) {
    data[prevUrl] = Math.floor((endTime - time) / 1000) + data[prevUrl];
  } else {
    data[prevUrl] = Math.floor((endTime - time) / 1000);
  }
  if (newUrl === '') {
    prevUrl = '';
  } else {
    prevUrl = newUrl.split('/')[2];
  }
  // totalTimeSpent += Math.floor((endTime - time) / 1000)
  time = new Date().getTime();
}

function addTimeToDB() {
  urlChange('//' + prevUrl)
  let db;
  const request = indexedDB.open('tte');
  request.onerror = (event) => {
    console.error('Database error: ', event.target.errorCode);
  };
  request.onsuccess = (event) => {
    db = event.target.result;
    const transaction = db.transaction(['time'], 'readwrite');
    transaction.onerror = (event) => {
      console.error('Database error: ', event.target.errorCode);
    };
    const obs = transaction.objectStore('time');
    const d = dayjs().format('YYYY/MM/DD')
    const getDataRequest = obs.get(d);
    getDataRequest.onsuccess = (event) => {
      if (event.target.result === undefined) {
        let websitesVisited = 0
        let totalTimeSpent = 0
        let averageTimeSpent
        for (let key in data) {
          if (key === undefined) {
            continue
          }
          websitesVisited++
          totalTimeSpent += data[key]
        }
        averageTimeSpent = Math.floor(totalTimeSpent / websitesVisited)
        const dataadd = { date: d, data: data, websitesVisited: websitesVisited, totalTimeSpent: totalTimeSpent, averageTimeSpent: averageTimeSpent }
        const addDataFirstTime = obs.add(dataadd);
        addDataFirstTime.onsuccess = (event) => {
          data = {};
        };
      } else {
        let oldData = event.target.result.data;
        let websitesVisited = 0
        let totalTimeSpent = 0
        let averageTimeSpent = ""

        for (let key in data) {
          if (key === undefined) {
            continue;
          }
          if (oldData[key] === undefined) {
            oldData[key] = Math.floor(data[key]);
          } else {
            oldData[key] = oldData[key] + Math.floor(data[key]);
          }
        }

        // calculate total stats
        for(let key in oldData) {
          websitesVisited++
          totalTimeSpent += oldData[key]
        }

        averageTimeSpent = Math.floor(totalTimeSpent / websitesVisited)
        const addDataAgain = obs.put({ date: d, data: oldData, websitesVisited: websitesVisited, totalTimeSpent: totalTimeSpent, averageTimeSpent: averageTimeSpent });
        addDataAgain.onsuccess = (event) => {
          data = {};
        };
      }
    };
  };
}

chrome.windows.onFocusChanged.addListener(function (windowId) {
  if (windowId === chrome.windows.WINDOW_ID_NONE) {
    urlChange('//');
  } else {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      urlChange(tabs[0].url);
    });
  }
});

chrome.tabs.onActivated.addListener(function (activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function (tab) {
    urlChange(tab.url);
  });
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  urlChange(tab.url);
});

chrome.windows.onRemoved.addListener(function (windowId) {
  addTimeToDB();
});

chrome.alarms.onAlarm.addListener(function (alarm) {
    addTimeToDB();
});

chrome.alarms.create('addData', { periodInMinutes: 0.5, delayInMinutes: 0.5 });

chrome.idle.setDetectionInterval(30)

chrome.idle.onStateChanged.addListener((newState) => {
  if(newState === "locked")
    urlChange('//')
  else
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      urlChange(tabs[0].url)
    })
})