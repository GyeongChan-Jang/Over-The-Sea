import React from 'react'
import { BarChart, XAxis, Bar, LabelList } from 'recharts'
import { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

const CustomizedLabel = ({ x, y, value }: any) => (
  <text x={x} y={y} dy={-10} dx={2} fontSize={12} textAnchor="right">
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

const BarGraph = ({ forecastWind, num }: any) => {
  return (
    <div className="flex justify-center mt-8 overflow-x-auto">
      <BarChart
        className="mx-auto"
        width={700}
        height={200}
        data={forecastWind?.slice(num * 6, (num + 1) * 6).map(({ fcstValue, fcstTime }: any) => ({
          fcstValue,
          fcstTime
        }))}
        margin={{ top: 30, right: 30, left: 30, bottom: 10 }}
      >
        <XAxis dataKey="fcstTime" fontSize={16} tickFormatter={formXAxis} />
        <Bar dataKey="fcstValue" fill="#a8dadc">
          <LabelList content={<CustomizedLabel />} />
        </Bar>
      </BarChart>
    </div>
  )
}

const WindGraph = ({ forecastWind }: any) => {
  console.log(forecastWind)
  const slides = []

  for (let i = 0; i < 2; i++) {
    slides.push(
      <SwiperSlide key={i}>
        <BarGraph forecastWind={forecastWind} num={i} />
      </SwiperSlide>
    )
  }
  return (
    <div className="flex justify-center overflow-x-auto">
      <Swiper navigation={true} modules={[Navigation]}>
        {slides}
      </Swiper>
    </div>
  )
}

export default WindGraph
