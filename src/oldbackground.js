console.log('Hello, World!');

const date = new Date()
let time = date.getTime()
let data = {}
let curUrl = "chrome://newtab/", prevUrl

function addTime() {
  const time = data[curUrl]
  data[curUrl] = time + 20
  console.log(data)
}

// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//     if(changeInfo.status === "complete" && tab.url != "")
//     {
//       console.log(tab.url)
//       curUrl = tab.url
//       data[curUrl] = 1
//       setTimeout(() => {
//         addTime()
//       }, 20000)
//     }
//     else
//     {
//       console.log("onUpdate fired")
//     }
//   }
// )

// // chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
// //   if(changeInfo.status === "complete" && tab.url != "")
// //   {
// //     console.log(tab.url)
// //     curUrl = tab.url
// //     const newD = new Date()
// //     const endTime = newD.getTime()

// //     if (data[prevUrl] >= 1) {
// //       const curTime = data[prevUrl]
// //       data[prevUrl] = (endTime - time) + curTime
// //       console.log("present")
// //       console.log(endTime - time)
// //       console.log(data)
// //     }
// //     else {
// //       console.log("not present")
// //       console.log(endTime - time)
// //       data[prevUrl] = 1
// //       console.log(data)
// //     }
    
// //     // console.log(endTime - time)
// //     time = endTime;
// //     prevUrl = curUrl
// //     // console.log(time)
// //   }
// // })

let activeTabId, lastUrl, lastTitle;

function getTabInfo(tabId) {
  chrome.tabs.get(tabId, function(tab) {
    if(lastUrl != tab.url || lastTitle != tab.title)
      console.log(lastUrl = tab.url, lastTitle = tab.title);
      curUrl = tab.url
      const urlData = data[curUrl]
      if(urlData)
      {
        console.log("Not Undefined")
      }
      else
      {
        data[curUrl] = 1
      }
      setTimeout(() => {
        addTime()
      }, 3000)
  });
}

chrome.tabs.onActivated.addListener(function(activeInfo) {
  getTabInfo(activeTabId = activeInfo.tabId);
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if(activeTabId == tabId) {
    getTabInfo(tabId);
  }
});

chrome.alarms.create("addTime", {delayInMinutes: 1, periodInMinutes: 1});

chrome.alarms.onAlarm.addListener(alarmTime);

function alarmTime() {
  const time = data[curUrl]
  data[curUrl] = time + 20
  console.log(data)
  console.log("alarm fired")
}
