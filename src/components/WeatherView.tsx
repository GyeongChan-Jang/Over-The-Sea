import React from 'react'

interface WeatherViewProps {
  fcstDate: string
  fcstTime: string
  fcstCategory: string
  fcstValue: string
}
const WeatherView = ({ fcstDate, fcstTime, fcstCategory, fcstValue }: WeatherViewProps) => {
  switch (fcstCategory) {
    case 'POP':
      return <div>{fcstValue}%</div>
    case 'PTY':
      if (fcstValue === '0') {
        return <div>맑음</div>
      } else if (fcstValue === '1') {
        return <div>비</div>
      } else if (fcstValue === '2') {
        return <div>비/눈</div>
      } else if (fcstValue === '3') {
        return <div>눈</div>
      } else if (fcstValue === '4') {
        return <div>소나기</div>
      }
    case 'REH':
      return <div>{fcstValue}%</div>
    case 'SKY':
      if (fcstValue === '1') {
        return <div>맑음</div>
      } else if (fcstValue === '3') {
        return <div>구름많음</div>
      } else if (fcstValue === '4') {
        return <div>흐림</div>
      }
    case 'VEC':
      return <div>{fcstValue}</div>
    case 'WSD':
      return <div>{fcstValue}m/s</div>
  }
}

export default WeatherView
