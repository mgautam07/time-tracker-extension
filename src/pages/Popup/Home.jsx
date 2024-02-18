import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import DoughnutChart from './components/DoughtnutChart'
import WebsiteTimeList from './components/WebsiteTimeList'
import TotalStats from './components/TotalStats'

function Home() {
  const [date, setDate] = useState(dayjs())
  const [displayData, setDisplayData] = useState([
    {value: 400 },
    {value: 300 },
    {value: 300 },
    {value: 200 },
    {value: 278 },
    {value: 189 },
  ])
  const [totalData, setTotalData] = useState({
    totalTimeSpent: "0s",
    websitesVisited: 0,
    averageTimeSpent: "0s"
  })

  function reduceDate() {
    setDate(date.subtract(1, 'day'))
  }

  function increaseDate() {
    setDate(date.add(1, 'day'))
  }
  useEffect(() => {
    let db
    const request = indexedDB.open("tte")
    request.onerror = (event) => {
      console.error("Database error: ", event.target.errorCode)
    }
    request.onsuccess = (event) => {
      db = event.target.result
      console.log("Database opened successfully")
      const transaction = db.transaction(["time"])
      transaction.onerror = (event) => {
        console.error("Database error: ", event.target.errorCode)
      }
      const obs = transaction.objectStore("time")
      const getDataRequest = obs.get(date.format('M/D/YYYY'))
      getDataRequest.onsuccess = (event) => {
        let data = event.target.result
        setTotalData({
          totalTimeSpent: data.totalTimeSpent,
          websitesVisited: data.websitesVisited,
          averageTimeSpent: data.averageTimeSpent
        })
        if(Object.keys(data.data).length !== 0) {
          data = data.data
          let arr = []
          for (let key in data) {
            const temp = key.replace('www.', '')
            arr.push({'name': temp, 'value': Math.floor(data[key])})
          }
          arr.sort((a, b) => {
            return b.value - a.value
          })
          setDisplayData(arr)
          console.log(displayData)
        } else {
          setDisplayData([{'name':'no record','value': 1}])
          console.log(displayData)
        }
      }
    }
  }, [date])
  return (
    <div>
      <div className='text-center p-2 text-sm'>Time Keeper</div>
      <div>
        <button onClick={reduceDate}>LA</button>
        {date.format('D/M/YYYY')}
        <button onClick={increaseDate}>RA</button>
      </div>
      {console.log(date.format('D/M/YYYY'))}
      <DoughnutChart displayData={displayData} />
      <TotalStats totalData={totalData}/>
      <WebsiteTimeList displayData={displayData}/>
      <ul>
        <li>
          <a href="#/">Home</a>
        </li>
        <li>
          <a href="#/about">About</a>
        </li>
      </ul>
      Home
    </div>
  );
}

export default Home;
