import React from "react"
import {
  PieChart,
  Pie,
  Legend
} from 'recharts'

const MostPlayedLocationChart = props => {
  const locations = []

  props.sessions.map(session => {
    let locationExists = false
    let location;

    locations.forEach(l => {
      if (session.location === l) {
        locationExists = true
      }
    })

    if (!locationExists) {
      locations.push(session.location)
    }
  })

  let data = []

  locations.map(location => {

    // return array of sessions mapped to the same location
    let sessions = props.sessions.filter(session => {
      if (session.location == location) {
        return session
      } else {
        return null
      }
    })

    data.push({name: sessions[0].location, value: sessions.length})
  })



  return (
    data.length > 0 ?
      <PieChart width={730} height={250}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={90}
          fill="#82ca9d"
          legend
        />
        <Legend />
      </PieChart> :
      <p>Not enough data to display chart.</p>
  )

}

export default MostPlayedLocationChart
