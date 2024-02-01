import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import DoughnutChart from './components/DoughtnutChart'

function Home() {
  const [date, setDate] = useState(dayjs())

  function reduceDate() {
    setDate(date.subtract(1, 'day'))
  }

  function increaseDate() {
    setDate(date.add(1, 'day'))
  }

  return (
    <div>
      <div>
        <button onClick={reduceDate}>LA</button>
        {date.format('DD/MM/YYYY')}
        <button onClick={increaseDate}>RA</button>
      </div>
      {console.log(date.format('DD/MM/YYYY'))}
      <DoughnutChart date={date} />
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
