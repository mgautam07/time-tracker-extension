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

  const [displayData, setDisplayData] = useState([
    {value: 5, day: 'S'},
    {value: 1, day: 'M'},
    {value: 0, day: 'T'},
    {value: 9, day: 'W'},
    {value: 1, day: 'T'},
    {value: 10, day: 'F'},
    {value: 22, day: 'S'},
  ])

  function reduceWeek() {
    setWeek(week - 1)
    setweekStart(week - 7)
  }

  function increaseWeek() {
    setWeek(week + 1)
    setweekStart(week + 7)
  }

  return (
    <div>
      <div className='min-h-8 grid grid-cols-3 font-medium text-center pt-1'>
        <a className='text-neutral-500 dark:text-neutral-400' href="#/">Home</a>
        <a className='border-b-2' href="#/week">Week</a>
        <a className='text-neutral-500 dark:text-neutral-400' href="#/webtimers">Web Timers</a>
      </div>
      <div className='p-1 pt-2'>
        <button className='mr-8' onClick={reduceWeek}> <FaChevronLeft /> </button>
        <div className='inline-block font-medium min-w-20'> Week {week}</div>
        <button className='ml-8' onClick={increaseWeek}> <FaChevronRight /> </button>
      </div>
      <WeekBarChart displayData={displayData}/>
    </div>
  )
}

export default Week
