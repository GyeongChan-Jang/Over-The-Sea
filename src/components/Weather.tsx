import { getTableBodyUtilityClass, imageListClasses } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import useConvertLatLng from '~/hooks/useConvertLatLng'
import { getWeather } from '~/utils/getWeather'
import useTime from '~/hooks/useTime'

const Weather = () => {
  const { today, nowForcastTime } = useTime()
  // const { lat, lng } = useConvertLatLng()
  // const [data, setData] = useState<any>([
  //   pop: [],
  //   pcp: [],
  //   tmp: []
  // ])
  // let pop: any = []
  // let pcp: any = []
  // let tmp: any = []
  const [nowTime, setNowTime] = useState<any>(new Date())
  const [data, setData] = useState<any>([])
  const [pop, setPop] = useState<any>([])
  const [reh, setPcp] = useState<any>([])
  const [tmp, setTmp] = useState<any>([])
  const [sky, setSky] = useState<any>([])

  useEffect(() => {
    const payload = { today, nowForcastTime }
    console.log(payload)
    getWeather(payload)
      .then((res) => {
        console.log(res)
        res?.map((item: any) => {
          if (item.category === 'POP') {
            setPop((prev: any) => [...prev, item])
          } else if (item.category === 'REH') {
            setPcp((prev: any) => [...prev, item])
          } else if (item.category === 'TMP') {
            setTmp((prev: any) => [...prev, item])
          } else if (item.category === 'SKY') {
            setSky((prev: any) => [...prev, item])
          }
        })
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <div className="">
      <p className="text-slate-600 pt-10 lg:text-2xl py-4 sm:text-xl">일기 예보</p>
      <div className="flex flex-col gap-2 lg:text-2xl p-4 sm:text-xl rounded-2xl shadow-2xl bg-white overflow-x-auto">
        <div>기온</div>
        <div>{data}</div>
        <div className="flex gap-4">
          {tmp.map((item: any) => {
            return (
              <div className="flex flex-col">
                <div>{item.fcstValue}℃</div>
              </div>
            )
          })}
        </div>
        <div>하늘상태</div>
        <div className="flex">
          {sky.map((item: any, index: any) => {
            return (
              <div key={index}>
                <div className="text-slate-600">
                  {item.fcstValue >= 0 || item.fcstValue < 6 ? (
                    <img src="../../public/assets/weather/day.svg" alt="sunny" />
                  ) : item.fcstValue >= 6 ? (
                    <img src="../../public/assets/weather/cloudy.svg" alt="cloudy" />
                  ) : (
                    ''
                  )}
                </div>
              </div>
            )
          })}
        </div>
        <div>강수확률</div>
        <div className="flex gap-4">
          {pop.map((item: any, index: any) => {
            return (
              <div key={index}>
                <div>
                  {item.fcstValue === 0 ? (
                    <img src="../../public/assets/weather/day.svg" alt="rain" />
                  ) : item.fcstValue >= 10 && item.fcstValue < 40 ? (
                    <img src="../../public/assets/weather/rainy-4.svg" alt="" />
                  ) : item.fcstValue >= 40 && item.fcstValue < 70 ? (
                    <img src="../../public/assets/weather/rainy-5.svg" alt="" />
                  ) : item.fcstValue >= 70 ? (
                    <img src="../../public/assets/weather/rainy-6.svg" alt="" />
                  ) : (
                    ''
                  )}
                </div>
                <div>{item.fcstValue}%</div>
                <div>
                  <span>시간</span>
                  {item.fcstTime}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Weather
