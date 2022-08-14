import { BarChart, XAxis, Bar } from 'recharts'
import { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

const CustomizedLabel = ({ x, y, value }: any) => (
  <text x={x} y={y} dy={-10} fontSize={14} textAnchor="middle">
    {value}%
  </text>
)

const BarGraph = ({ forecastHum, num }: any) => {
  return (
    <BarChart
      width={640}
      height={200}
      data={forecastHum
        ?.slice(num * 6, (num + 1) * 6)
        .map(({ fcstValue, fcstTime }: any) => ({ fcstValue, fcstTime }))}
      margin={{ top: 30, right: 30, left: 30, bottom: 10 }}
    >
      <XAxis dataKey="fcstTime" fontSize={16} />
      <Bar dataKey="fcstValue" fill="#2c6cff" label={<CustomizedLabel />} />
    </BarChart>
  )
}

const HumidityGraph = ({ forecastHum }: any) => {
  const slides = []

  for (let i = 0; i < 2; i++) {
    slides.push(
      <SwiperSlide key={i}>
        <BarGraph forecastTmp={forecastHum} num={i} />
      </SwiperSlide>
    )
  }
  return (
    <div>
      <Swiper navigation={true} modules={[Navigation]}>
        {slides}
      </Swiper>
    </div>
  )
}

export default HumidityGraph
