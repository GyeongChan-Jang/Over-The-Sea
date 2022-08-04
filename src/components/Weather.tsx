import { dialogActionsClasses } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Weather = () => {
  const [data, setData] = useState([])
  const queryParams = {
    serviceKey: import.meta.env.VITE_WEATHER_API_KEY,
    pageNo: 1,
    numOfRows: 100,
    dataType: 'JSON',
    base_date: '20220804',
    base_time: '1700',
    nx: 55,
    ny: 127
  }

  const fecthData = async () => {
    try {
      const response = await axios.get(
        `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${
          import.meta.env.VITE_WEATHER_API_KEY
        }&numOfRows=${50}&pageNo=1&base_date=${20220803}&base_time=${1700}&nx=${55}&ny=${127}&dataType=JSON`
      )
      setData(response.data.response.body.items.item)
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    fecthData()
  }, [])

  return (
    <div>
      <div className="container max-w-7xl mx-auto sm:w-9/12 lg:w-9/12">
        <div className="title lg:text-2xl py-4 sm:text-xl">
          <p className="text-slate-600">오늘의 날씨는?!</p>
          {data.map((item) => {
            return (
              <p>
                {item.fcstDate} {item.fcstTime} {item.category} {item.fcstValue}
              </p>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Weather