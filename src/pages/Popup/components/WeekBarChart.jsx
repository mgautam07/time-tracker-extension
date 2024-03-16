import React from 'react'
import { BarChart, Bar, ReferenceLine, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts'

function WeekBarChart(props) {

  const CustomTooltip = ({ active, payload }) => {
    if (active) {
      return (
        <div className="w-5 h-5 bg-[#35C172] rounded-md">
          <p className="label">{`${payload[0].value}`}</p> 
        </div>
      );
    }
  }

  return (
    <div className='text-center px-4'>
      <BarChart width={250} height={200} data={props.displayData}>
        {console.log(props.displayData)}
        <XAxis dataKey="day" tickLine={false} axisLine={false} /> 
        <YAxis width={30} axisLine={false} tickLine={{opacity: 0.7}} tickCount={4} domain={[0, dataMax => (Math.min(24, dataMax + 4))]}/>
        <Bar dataKey="value" barSize={12} fill="#C13584"/>
        <ReferenceLine y={7} strokeDasharray="8 8" strokeWidth={2} stroke="#3584C1"/>
        {/* <Line dataKey="avg" dot={false} activeDot={true} /> */}
        <Tooltip cursor={{ fill: "transparent" }} content={<CustomTooltip />}/>
        <CartesianGrid vertical={false} opacity={0.3}/>
      </BarChart>
    </div>
  )
}

export default WeekBarChart