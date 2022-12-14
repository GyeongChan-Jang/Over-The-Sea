import React from 'react'
import { LineChart, XAxis, Line, Tooltip, LabelList } from 'recharts'
import { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

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

const CustomizedLabel = ({ x, y, value }: any) => (
  <text x={x} y={y} dy={-10} fontSize={14} textAnchor="middle">
    {value}℃
  </text>
)

const LignGraph = ({ forecastTmp, num }: any) => {
  return (
    <div className="flex justify-center mt-8 overflow-x-auto">
      <LineChart
        width={700}
        height={200}
        data={forecastTmp?.slice(num * 6, (num + 1) * 6).map(({ fcstValue, fcstTime }: any) => ({
          fcstValue,
          fcstTime
        }))}
        margin={{
          top: 30,
          right: 30,
          left: 30,
          bottom: 10
        }}
      >
        {/* <Tooltip /> */}
        <XAxis dataKey="fcstTime" fontSize={16} tickFormatter={formXAxis} />
        <Line type="monotone" dataKey="fcstValue" stroke="#8884d8" strokeWidth={4}>
          <LabelList content={<CustomizedLabel />} />
        </Line>
      </LineChart>
    </div>
  )
}

const WeatherGraph = ({ forecastTmp }: any) => {
  const slides = []

  for (let i = 0; i < 2; i++) {
    slides.push(
      <SwiperSlide key={i}>
        <LignGraph forecastTmp={forecastTmp} num={i} />
      </SwiperSlide>
    )
  }

  return (
    <Swiper navigation={true} modules={[Navigation]}>
      {slides}
    </Swiper>
  )
}

export default WeatherGraph
