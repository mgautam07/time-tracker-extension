import React from 'react'

function TotalStats(props) {
  return (
    <div>
      Total time spent {props.totalData.totalTimeSpent}
      <br />
      Websites visited {props.totalData.websitesVisited}
      <br />
      Avg time per website {props.totalData.averageTimeSpent}
      <br />
    </div>
  )
}

export default TotalStats