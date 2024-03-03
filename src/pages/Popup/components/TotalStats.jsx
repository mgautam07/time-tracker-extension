import React from 'react'

function handleTime(time)
{
  let timeString = ""
  const hours = Math.floor(time / 3600)
  time = time % 3600
  if(hours !== 0)
  {
    timeString = timeString + hours + 'h '
  }
  const minutes = Math.floor(time / 60)
  if(minutes !== 0)
  {
    timeString = timeString + minutes + 'm'
  }
  if(hours === 0)
  {
    time = time % 60
    timeString = timeString + ' ' + time + 's'
  }
  return timeString
}

function TotalStats(props) {
  return (
    <div className='flex my-6 w-4/5 mx-auto'>
      <div className='grow'>
        <div className='text-gray-900 font-semibold text-lg dark:text-neutral-200'>{handleTime(props.totalData.totalTimeSpent)}</div>
        <div className='text-xs text-neutral-600 dark:text-neutral-400'>Time</div>
      </div>
      <div class="inline-block min-h-[1em] w-0.5 self-stretch bg-neutral-200 opacity-100 dark:opacity-50"></div>
      <div className='grow'>
        <div className='text-gray-900 font-semibold text-lg dark:text-neutral-200'>{props.totalData.websitesVisited}</div>
        <div className='text-xs text-neutral-600 dark:text-neutral-400'>Sites</div>
      </div>
      <div class="inline-block min-h-[1em] w-0.5 self-stretch bg-neutral-200 opacity-100 dark:opacity-50"></div>
      <div className='grow'>
        <div className='text-gray-900 font-semibold text-lg dark:text-neutral-200'>{handleTime(props.totalData.averageTimeSpent)}</div>
        <div className='text-xs text-neutral-600 dark:text-neutral-400'>Avg. Time</div>
      </div>
    </div>
  )
}

export default TotalStats