import React from 'react'
import { BarChart, XAxis, Bar } from 'recharts'

const BarGraph = ({ num }: any) => {
  return (
    <BarChart
      width={960}
      height={120}
      data={}
      margin={{ top: 30, right: 30, left: 30, bottom: 10 }}
    >
      <XAxis dataKey="" fontSize={16} />
      <Bar dataKey="" fill="#2c6cff" />
    </BarChart>
  )
}

const Humidity = () => {
  return <div>Humidity</div>
}

export default Humidity
