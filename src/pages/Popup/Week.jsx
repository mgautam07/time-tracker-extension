import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import WebsiteTimeList from './components/WebsiteTimeList'
import TotalStats from './components/TotalStats'
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import WeekBarChart from './components/WeekBarChart'

function Week() {

  var weekOfYear = require('dayjs/plugin/weekOfYear')
  dayjs.extend(weekOfYear)

  const [week, setWeek] = useState(dayjs().week())
  const [weekStart, setweekStart] = useState(0)

  const [displayData, setDisplayData] = useState({
    'data': [
      {value: 5, day: 'S'},
      {value: 1, day: 'M'},
      {value: 0, day: 'T'},
      {value: 9, day: 'W'},
      {value: 1, day: 'T'},
      {value: 10, day: 'F'},
      {value: 22, day: 'S'},
    ],
    'avg': 0
  })

  const [totalData, setTotalData] = useState({
    totalTimeSpent: 0,
    websitesVisited: 0,
    averageTimeSpent: 0
  })
  
  const [timeList, setTimeList] = useState([])

  function reduceWeek() {
    setWeek(week - 1)
    setweekStart(weekStart - 7)
  }

  function increaseWeek() {
    setWeek(week + 1)
    setweekStart(weekStart + 7)
  }

  function getDayInfo(i)
  {
    switch (i) {
      case 0:
        return 'S' 
      case 1:
        return 'M' 
      case 2:
        return 'T'
      case 3:
        return 'W' 
      case 4:
        return 'T' 
      case 5:
        return 'F' 
      case 6:
        return 'S'
      default:
        return 'E'
    }
  }

  function secondsToHours(t)
  {
    return Math.round(t / 360) / 10
  }

  useEffect(() => {
    let db
    const request = indexedDB.open("tte")
    request.onerror = (event) => {
      console.error("Database error: ", event.target.errorCode)
    }

    request.onsuccess = (event) => {
      db = event.target.result
      const transaction = db.transaction(["time"])
      transaction.onerror = (event) => {
        console.error("Database error: ", event.target.errorCode)
      }
      const obs = transaction.objectStore("time")
      let weekend = weekStart + 6
      let totalTime = 0
      let websiteTime = {}
      const keyRangeValue = IDBKeyRange.bound(dayjs().day(weekStart).format('YYYY/MM/DD'), dayjs().day(weekend).format('YYYY/MM/DD'))
      let tempWeekData = [
        {value: 0, day: 'S'},
        {value: 0, day: 'M'},
        {value: 0, day: 'T'},
        {value: 0, day: 'W'},
        {value: 0, day: 'T'},
        {value: 0, day: 'F'},
        {value: 0, day: 'S'}
      ]
      obs.openCursor(keyRangeValue).onsuccess = (event) => {
        const cursor = event.target.result
        if (cursor) {
          let tempDayData = {}
          let data = cursor.value
          let dayNumber = dayjs(data.date, "YYYY/MM/DD").day()

          tempDayData['day'] = getDayInfo(dayNumber)
          tempDayData['value'] = secondsToHours(data.totalTimeSpent)
          totalTime += data.totalTimeSpent
          data = data.data

          for (let key in data)
          {
            if (websiteTime[key])
              websiteTime[key] += data[key]
            else
              websiteTime[key] = data[key]
          }          
          tempWeekData[dayNumber] = tempDayData
          cursor.continue()
        }
        else {
          let weekAvg = 0
          let nonZeroDays = 0
          for (let i = 0; i < tempWeekData.length; i++) {
            weekAvg += tempWeekData[i].value
            if(tempWeekData[i].value !== 0) nonZeroDays++
          }
          setDisplayData({
            'data': tempWeekData,
            'avg': nonZeroDays ? weekAvg / nonZeroDays : 0
          })

          let arr =[]
          for(let key in websiteTime)
          {
            arr.push({'name': key, 'value': websiteTime[key]})
          }
          arr.sort((a, b) => { return b.value - a.value })
          
          let numberOfWebsites = Object.keys(websiteTime).length
          setTotalData({
            totalTimeSpent: totalTime,
            websitesVisited: numberOfWebsites,
            averageTimeSpent: numberOfWebsites ? Math.round(totalTime / (numberOfWebsites * 10)) * 10 : 0
          })

          setTimeList(arr)
        }
      }
    }
  }, [week])

  return (
    <div className='min-h-[565px]'>
      <div className='min-h-8  grid grid-cols-3 font-medium text-center pt-1'>
        <a className='text-neutral-500 dark:text-neutral-400' href="#/">Home</a>
        <a className='border-b-2' href="#/week">Week</a>
        <a className='text-neutral-500 dark:text-neutral-400' href="#/webtimers">Web Timers</a>
      </div>
      <div className='p-1 pt-2'>
        <button className='mr-8' onClick={reduceWeek}> <FaChevronLeft /> </button>
        <div className='inline-block font-medium min-w-20'>Week {week}</div>
        <button className='ml-8' onClick={increaseWeek}> <FaChevronRight /> </button>
      </div>
      <WeekBarChart displayData={displayData}/>
      <div className="-translate-y-3">
        <TotalStats  totalData={totalData}/>
        <WebsiteTimeList displayData={timeList} />
      </div>
    </div>
  )
}

export default Week
