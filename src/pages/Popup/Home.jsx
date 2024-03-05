import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import DoughnutChart from './components/DoughtnutChart'
import WebsiteTimeList from './components/WebsiteTimeList'
import TotalStats from './components/TotalStats'
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"

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

  function getColor(el) {
    console.log(el)
    switch (el) {
      case 'youtube.com':
      case 'music.youtube.com':
        return '#DC143C'
      case 'netflix.com':
        return '#E50914'
      case 'web.whatsapp.com':
        return '#25D366'
      case 'open.spotify.com':
        return '#1DB954'
      case 'twitter.com':
        return '#14171A'
      case 'instagram.com':
        return '#C13584'
      case 'reddit.com':
        return '#FF5700'
      case 'leetcode.com':
        return '#FBBD23'
      case 'github.com':
        return '#333'
      case 'hotstar.com':
        return '#01147C'
      case 'primevideo.com':
        return '#00A8E1'
      case 'slack.com':
        return '#ECB32D'
      default:
        return '#535C91'
    }
  }

  const colorArray = ['#ff7733', '#14cc8f', '#5d2f27', '#aad922', '#4169e1', '#d52941', '#00b3ff', '#5c3df5', '#f53d99'] 

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
      const getDataRequest = obs.get(date.format('D/M/YYYY'))
      getDataRequest.onsuccess = (event) => {
        let data = event.target.result
        if(data === undefined) {
          setTotalData({
            totalTimeSpent: 0,
            wbsitesVisited: 0,
            averageTimeSpent: 0
          })
          setDisplayData([{'name':'no record','value': 1}])
          return
        }
        console.log(date.format('D/M/YYYY'))
        setTotalData({
          totalTimeSpent: data.totalTimeSpent,
          websitesVisited: data.websitesVisited,
          averageTimeSpent: data.averageTimeSpent
        })
        if(Object.keys(data.data).length !== 0) {
          data = data.data
          let arr = []
          let i = 0
          for (let key in data) {
            const temp = key.replace('www.', '')
            // const clr = getColor(temp)
            arr.push({'name': temp, 'value': Math.floor(data[key]), 'color':colorArray[i%colorArray.length]})
            i++
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
    <div className='text-center text-sm dark:text-white dark:bg-neutral-900 min-h-[600px]'>
      <div className='p-2 text-base font-medium'>Time Keeper</div>
      <div className='p-1 '>
        <button className='mr-8' onClick={reduceDate}> <FaChevronLeft /> </button>
        <div className='inline-block font-medium min-w-20'>{date.format('D/M/YYYY')}</div>
        <button className='ml-8' onClick={increaseDate}> <FaChevronRight /> </button>
      </div>
      <DoughnutChart displayData={displayData} />
      <TotalStats totalData={totalData}/>
      <WebsiteTimeList displayData={displayData}/>
      {/* <ul>
        <li>
          <a href="#/">Home</a>
        </li>
        <li>
          <a href="#/about">About</a>
        </li>
      </ul> */}
    </div>
  );
}

export default Home;
