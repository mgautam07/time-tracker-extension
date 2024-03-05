import React from 'react'

function WebsiteTimeList(props) {

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
    if(minutes === 0 && hours === 0)
    {
      time = time % 60
      timeString = timeString + time + 's'
    }
    return timeString
  }

  function replaceImage(error) {
    error.target.src = 'error.png'
  }

  function getFavicon(domain) {
    if (domain !== undefined) {
      domain = domain.toString()
      if(domain.includes('.'))
        return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`
    }
    return 'error.png'
  }

  return (
    <div className='mt-4 w-5/6 mx-auto pb-2'>
      <div className='text-left font-semibold mb-1'>Most used websites</div>
      <ul className='space-y-2'>
        {
          props.displayData.map((el, index) => {
            return (
              <li key={index} className='mx-auto h-10 flex items-center space-x-4 rtl:space-x-reverse bg-neutral-100 rounded dark:bg-neutral-800'>
                <img className='w-6 h-6 rounded-full inline-block mx-2 dark:bg-neutral-800' src={getFavicon(el.name)} alt="" onError={replaceImage}/>
                <div className='inline-block flex-1 text-left text truncate'>
                  {el.name}
                </div>
                <div className='inline-block min-w-16 font-semibold text-right px-2'>
                  {handleTime(el.value)}
                </div>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default WebsiteTimeList