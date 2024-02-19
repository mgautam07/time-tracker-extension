import React from 'react'

function TotalStats(props) {
  return (
    <div className=' grid grid-cols-3 mt-6 mb-6 w-4/5 mx-auto'>
      <div>
        <div className='text-gray-900 font-semibold text-lg'>{props.totalData.totalTimeSpent}</div>
        <div className='text-xs text-slate-600'>Time</div>
      </div>
      <div>
        <div className='text-gray-900 font-semibold text-lg'>{props.totalData.websitesVisited}</div>
        <div className='text-xs text-slate-600'>Sites</div>
      </div>
      <div>
        <div className='text-gray-900 font-semibold text-lg'>{props.totalData.averageTimeSpent}</div>
        <div className='text-xs text-slate-600'>Avg. Time</div>
      </div>
    </div>
  )
}

export default TotalStats