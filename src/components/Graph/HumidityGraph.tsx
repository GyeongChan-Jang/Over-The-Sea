import { BarChart, XAxis, Bar, LabelList } from 'recharts'
import { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

const CustomizedLabel = ({ x, y, value }: any) => (
  <text x={x} y={y} dy={-10} fontSize={14} textAnchor="middle">
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
    <BarChart
      width={800}
      height={200}
      data={forecastHum}
      margin={{ top: 30, right: 30, left: 30, bottom: 10 }}
    >
      <XAxis dataKey="fcstTime" fontSize={16} tickFormatter={formXAxis} />
      <Bar dataKey="fcstValue" fill="#2c6cff">
        <LabelList content={<CustomizedLabel />} />
      </Bar>
    </BarChart>
  )
}

const HumidityGraph = ({ forecastHum }: any) => {
  console.log(forecastHum)
  // const slides = []

  // for (let i = 0; i < 2; i++) {
  //   slides.push(
  //     <SwiperSlide key={i}>
  //       <BarGraph forecastTmp={forecastHum} num={i} />
  //     </SwiperSlide>
  //   )
  // }
  return (
    <div className="flex justify-center overflow-x-auto">
      {/* <Swiper navigation={true} modules={[Navigation]}>
        {slides}
      </Swiper> */}
      <BarGraph forecastHum={forecastHum} num={0} />
    </div>
  )
}

export default HumidityGraph
