import React from 'react'
import { PieChart, Pie, Tooltip } from 'recharts'

function DoughtnutChart(props) {

  return (
    <div className='text-center'>
      <PieChart width={300} height={200}>
        <Pie dataKey="value" data={props.displayData} innerRadius={50} outerRadius={80} fill="#82ca9d" startAngle={450} endAngle={90} minAngle={5} />
        <Tooltip />
      </PieChart>
    </div>
  )
  
}

export default DoughtnutChart