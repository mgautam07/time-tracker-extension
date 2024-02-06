import React, { useEffect, useState } from 'react'
import { PieChart, Pie, Tooltip } from 'recharts'

function DoughtnutChart(props) {

  return (
    <div>
      <PieChart width={200} height={200}>
        <Pie dataKey="value" data={props.displayData} innerRadius={40} outerRadius={80} fill="#82ca9d" startAngle={450} endAngle={90} minAngle={5} />
        <Tooltip />
      </PieChart>
    </div>
  )
  
}

export default DoughtnutChart