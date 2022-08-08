import axios from 'axios'
import React, { useEffect, useState } from 'react'
import useConvertLatLng from '~/hooks/useConvertLatLng'
import { getWeather } from '~/utils/getWeather'

const Weather = () => {
  // const [data, setData] = useState<any>([
  //   pop: [],
  //   pcp: [],
  //   tmp: []
  // ])
  const pop: any = []
  const pcp: any = []
  const tmp: any = []

  useEffect(() => {
    getWeather(50, 156).then((res) => {
      res.map((item: any) => {
        if (item.category === 'POP') {
          pop.push(item)
        }
        if (item.category === 'PCP') {
          pcp.push(item)
        }
        if (item.category === 'TMP') {
          tmp.push(item)
        }
      })
    })
    console.log(pop)
  }, [])
  return (
    <div>
      <div className="container max-w-7xl mx-auto sm:w-9/12 lg:w-9/12">
        <div className="title lg:text-2xl py-4 sm:text-xl">
          <p className="text-slate-600">오늘의 날씨는?!</p>

          {pop?.map((item: any) => {
            return (
              <div>
                <div>
                  <span>강수확률: </span>
                  {item.fcstValue}
                </div>
                <div>
                  <span>오늘날짜: </span>
                  {item.fcstValue}
                </div>
                <div>
                  <span>시간: </span>
                  {item.fcstValue}
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
