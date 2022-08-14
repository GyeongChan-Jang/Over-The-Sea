import React from 'react'
import { BarChart, XAxis, Bar, LabelList } from 'recharts'
import { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

const CustomizedLabel = ({ x, y, value }: any) => (
  <text x={x} y={y} dy={-10} fontSize={14} textAnchor="middle">
    {value}m/s
  </text>
)

const formXAxis = (data: any): string => {
  if (data === '0000') {
    return '12시'
  }
  if (data.includes('0')) {
    data = data.replace('00', '')
    return data + '시'
  }
  return data
}

const WindGraph = ({ forecastWind, num }: any) => {
  console.log(forecastWind)
  return (
    <BarChart
      width={900}
      height={200}
      data={forecastWind}
      margin={{ top: 30, right: 30, left: 30, bottom: 10 }}
    >
      <XAxis dataKey="fcstTime" fontSize={16} tickFormatter={formXAxis} />
      <Bar dataKey="fcstValue" fill="#2c6cff">
        <LabelList content={<CustomizedLabel />} />
      </Bar>
    </BarChart>
  )
}

export default WindGraph
