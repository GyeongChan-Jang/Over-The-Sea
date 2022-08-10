import axios from 'axios'
import { useEffect, useState } from 'react'

interface WeatherPayload {
  today: string
  nowForcastTime: string
  nx?: number
  ny?: number
}

interface WeatherQuery {
  serviceKey: string
  pageNo: number
  numOfRows: number
  dataType: string
  base_date: string
  base_time: string
  nx: number
  ny: number
}

const queryParams: WeatherQuery = {
  serviceKey: import.meta.env.VITE_WEATHER_API_KEY,
  pageNo: 1,
  numOfRows: 100,
  dataType: 'JSON',
  base_date: '20220809',
  base_time: '1400',
  nx: 55,
  ny: 127
}
// { today, nowForcastTime, minutes }: WeatherPayload
export const getWeather = async (payload: any) => {
  try {
    const response = await axios.get(
      'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst',
      {
        params: {
          ...queryParams,
          nx: parseFloat(payload.nx),
          ny: parseFloat(payload.ny),
          base_date: payload.today,
          base_time: payload.nowForcastTime
        }
      }
    )
    return response.data.response.body.items.item
  } catch (e) {
    console.log(e)
  }
}
