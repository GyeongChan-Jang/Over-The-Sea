import { BarChart, XAxis, Bar, LabelList, ResponsiveContainer } from 'recharts'
import { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

const CustomizedLabel = ({ x, y, value }: any) => (
  <text x={x} y={y} dx={30} dy={-10} fontSize={12} textAnchor="right">
    {value}%
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

const BarGraph = ({ forecastHum, num }: any) => {
  return (
    <div className="flex justify-center mt-8 overflow-x-auto">
      <BarChart
        width={700}
        height={200}
        className="mx-auto"
        data={forecastHum?.slice(num * 6, (num + 1) * 6).map(({ fcstValue, fcstTime }: any) => ({
          fcstValue,
          fcstTime
        }))}
        margin={{ top: 30, right: 30, left: 30, bottom: 10 }}
      >
        <XAxis dataKey="fcstTime" fontSize={16} tickFormatter={formXAxis} />
        <Bar dataKey="fcstValue" fill="#2c6cff">
          <LabelList content={<CustomizedLabel />} />
        </Bar>
      </BarChart>
    </div>
  )
}

const HumidityGraph = ({ forecastHum }: any) => {
  console.log(forecastHum)
  const slides = []

  for (let i = 0; i < 2; i++) {
    slides.push(
      <SwiperSlide key={i}>
        <BarGraph forecastHum={forecastHum} num={i} />
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

export default HumidityGraph
