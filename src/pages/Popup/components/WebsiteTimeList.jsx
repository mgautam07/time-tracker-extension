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

  return (
    <div>
      <ul>
        {
          props.displayData.map((el) => {
            return (
              <li>
                <img src={'https://' + el.name + '/favicon.ico'} alt="" />
                {el.name}
                {handleTime(el.value)}
              </li>
            )
          })
        }
      </ul>
      
    </div>
  )
}

export default WebsiteTimeList