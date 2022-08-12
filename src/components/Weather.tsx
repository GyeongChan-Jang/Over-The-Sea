import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { getWeather } from '~/utils/getWeather'
import useTime from '~/hooks/useTime'
import useConvertLatLng from '~/hooks/useConvertLatLng'
import Loading from './Loading'

const Weather = ({ regionName, locations }: any) => {
  const { rs } = useConvertLatLng({
    geoX: locations && locations[0]?.lon,
    geoY: locations && locations[0]?.lat
  })
  const { today, nowForcastTime } = useTime()

  // const [pop, setPop] = useState<any>([])
  // const [reh, setPcp] = useState<any>([])
  // const [tmp, setTmp] = useState<any>([])
  // const [sky, setSky] = useState<any>([])
  const [todayLow, setTodayLow] = useState<any>()
  const [todayHigh, setTodayHigh] = useState<any>()
  const [todayWeather, setTodayWeather] = useState<any>()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const payload = { today, nowForcastTime, numOfRows: 1000, nx: rs.x, ny: rs.y }
    getWeather(payload)
      .then((res) => {
        setIsLoading(false)
        console.log(res)
        setTodayWeather(res.slice(0, 12))
        res.find((item: any) => {
          if (item.category === 'TMN') {
            setTodayLow(item.fcstValue)
          }
          if (item.category === 'TMX') {
            setTodayHigh(item.fcstValue)
          }
        })
        // res?.map((item: any) => {
        //   if (item.category === 'POP') {
        //     setPop((prev: any) => [...prev, item])
        //   } else if (item.category === 'REH') {
        //     setPcp((prev: any) => [...prev, item])
        //   } else if (item.category === 'TMP') {
        //     setTmp((prev: any) => [...prev, item])
        //   } else if (item.category === 'SKY') {
        //     setSky((prev: any) => [...prev, item])
        //   }
        // })
      })
      .catch((err) => console.log(err))
  }, [])

  console.log(todayWeather)

  return (
    <>
      <div>
        <div className="flex flex-col gap-2 lg:text-2xl p-4 sm:text-xl rounded-2xl shadow-2xl bg-white overflow-x-auto h-[450px] relative ">
          {!isLoading ? (
            <>
              <div className="my-4 text-center text-3xl text-slate-800">
                {regionName} /{' '}
                {todayWeather[5].fcstValue == 1 ? (
                  <img src="../../public/assets/weather/day.svg" />
                ) : todayWeather[5].fcstValue == 3 ? (
                  <img
                    className="relative top-6 bottom-4 "
                    src="../../public/assets/weather/cloudy-day-3.svg"
                  />
                ) : todayWeather[5].fcstValue == 4 ? (
                  <img src="../../public/assets/weather/cloudy.svg" />
                ) : todayWeather[5].fcstValue == 3 && todayWeather[6] == 1 ? (
                  <img src="../../public/assets/weather/rainy-4.svg" />
                ) : todayWeather[5].fcstValue == 4 && todayWeather[6] == 1 ? (
                  <img src="../../public/assets/weather/rainy-5.svg" />
                ) : (
                  ''
                )}
                <span>{todayWeather[0].fcstValue}℃</span>
              </div>
              <div>
                <div className="flex mt-2">
                  <div className="flex-1 text-center text-xl">
                    최저기온
                    <span className="text-blue-800"> {todayLow}℃</span>
                  </div>
                  <div className="flex-1 text-center text-xl">
                    최고기온
                    <span className="text-red-800"> {todayHigh}℃</span>
                  </div>
                </div>
                <div className="flex mt-6">
                  <div className="flex flex-1 text-center text-xl justify-center">
                    <img src="../../public/assets/weather/humidity.png" width={40} height={40} />
                    <p className="text-sm ml-2">
                      <span className="text-sky-700 text-[1rem]">
                        {todayWeather[10].fcstValue}%
                      </span>{' '}
                      <br />
                      습도
                    </p>
                  </div>
                  <div className="flex flex-1 text-center text-xl justify-center">
                    <img src="../../public/assets/weather/wind.png" width={40} height={40} />
                    <p className="text-sm ml-2">
                      <span className="text-blue-600 text-[1rem]">
                        {todayWeather[4].fcstValue}m/s
                      </span>{' '}
                      <br />
                      바람
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="absolute inset-y-1/2 left-1/2 -translate-x-10 -translate-y-10">
              <Loading />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Weather
