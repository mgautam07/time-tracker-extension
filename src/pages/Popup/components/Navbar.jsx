import React from 'react'

function Navbar() {
  return (
    <div className='min-h-8 grid grid-cols-3'>
      <a className='ring ring-violet-300 box-border ring-inset' href="#/">Home</a>
      <a className='ring ring-violet-300 box-border ring-inset' href="#/week">Week</a>
      <a className='ring ring-violet-300 box-border ring-inset' href="#/webtimers">Web timers</a>
    </div>
  )
}

export default Navbar