import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

function DoughtnutChart(props) {

  const [displayData, setDisplayData] = useState({
    datasets: [
      {
        data: [1,1,1,1],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#FF6384',
        ],
        borderWidth: 0,
      },
    ],
  })
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
      const getDataRequest = obs.get(props.date.format('M/DD/YYYY'))
      getDataRequest.onsuccess = (event) => {
        let data = event.target.result
        if(data) {
          data = data.data
          let arr = [], chartData = []
          for (let key in data) {
            arr.push({'url': key, 'time': data[key]})
          }
          arr.sort((a, b) => {
            return b.time > a.time
          })
          for(let i = 0; i < Math.min(arr.length, 10); i++) {
            chartData.push(Math.floor(arr[i].time))
          }
          let copyDisplayData = {...displayData}
          copyDisplayData.datasets[0].data = chartData
          console.log(copyDisplayData)
          setDisplayData(copyDisplayData)
        } else {

        } // change
      }
    }
  }, [props.date])
  // useEffect(() => {
  //   chrome.storage.local.get(['tte'], (result) => {
  //     console.log(result)
  //   })
  // }, [])
  // useEffect(() => {
  //   console.log(props.date)
  // }, [props.date])
  return (
    <div>
      {console.log(props.date.format('M/DD/YYYY'))}
      <Doughnut data={displayData} redraw={true}/>
      {console.log(displayData)}
    </div>
  )
}

export default DoughtnutChart