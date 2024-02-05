import React, { useEffect, useState } from 'react'
import { PieChart, Pie, Tooltip } from 'recharts'

function DoughtnutChart(props) {

  const [displayData, setDisplayData] = useState([
    {value: 400 },
    {value: 300 },
    {value: 300 },
    {value: 200 },
    {value: 278 },
    {value: 189 },
  ])
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
        console.log(event)
        if(data) {
          data = data.data
          let arr = []
          for (let key in data) {
            arr.push({'name': key, 'value': Math.floor(data[key])})
          }
          arr.sort((a, b) => {
            return a.value - b.value
          })
            setDisplayData(arr)
            console.log(displayData)
        } else {
          setDisplayData([{'name':'no record','value': 1}])
        }
      }
    }
  }, [props.date])
  return (
    <div>
        <PieChart width={200} height={200}>
          <Pie dataKey="value" data={displayData} innerRadius={40} outerRadius={80} fill="#82ca9d" startAngle={90} endAngle={450} />
          <Tooltip />
        </PieChart>
      {console.log(displayData)}
    </div>
  )
  
}

export default DoughtnutChart