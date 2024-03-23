import React from 'react'

function Timers() {
  return (
    <div className='min-h-[565px]'>
      <div className='min-h-8 grid grid-cols-3 font-medium text-center pt-1'>
        <a className='text-neutral-500 dark:text-neutral-400' href="#/">Home</a>
        <a className='text-neutral-500 dark:text-neutral-400' href="#/week">Week</a>
        <a className='border-b-2' href="#/webtimers">Web Timers</a>
      </div>
      <div className='p-1 pt-2'>
        Coming Soon
      </div>
    </div>
  )
}

export default Timers