import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { Card, Tabs } from 'flowbite-react'
import { imageListClasses } from '@mui/material'
import useTime from '~/hooks/useTime'
import useConvertLatLng from '~/hooks/useConvertLatLng'
import { getWeather } from '~/utils/getWeather'
import Loading from '~/components/Loading'

interface WeatherResponse {
  baseData: string
  baseTime: string
  category: string
  fcstDate: string
  fcstTime: string
  fcstValue: string
  nx: number
  ny: number
}

const MapOverlay = ({ setIsOpen, location }: any) => {
  const { today, nowForcastTime } = useTime()
  const [isLoading, setIsLoading] = useState(true)
  const [sky, setSky] = useState<any>([])
  const [pop, setPop] = useState<any>([])
  const [tmp, setTmp] = useState<any>([])
  const rs: any = useConvertLatLng({
    geoX: parseFloat(location.lon),
    geoY: parseFloat(location.lat)
  })

  useEffect(() => {
    const { x, y } = rs.rs
    getWeather({ today, nowForcastTime, nx: x, ny: y, numOfRows: 80 })
      .then((res) => {
        setIsLoading(false)
        console.log(res)
        res?.map((item: WeatherResponse) => {
          if (item.category === 'SKY') {
            setSky((prev: any) => [...prev, item])
          }
          if (item.category === 'POP') {
            setPop((prev: any) => [...prev, item])
          }
          if (item.category === 'TMP') {
            setTmp((prev: any) => [...prev, item])
          }
        })
      })
      .catch((err) => console.log(err))
  }, [])
  console.log(today)
  console.log(sky)
  console.log(parseInt(nowForcastTime), sky[0]?.fcstTime)

  return (
    <div className="overlaybox">
      <div className="max-w-xs -m-2">
        <Card
          imgAlt="Meaningful alt text for an image that is not purely decorative"
          imgSrc="https://www.gtdc.or.kr/dzSmart/upfiles/Tours/2018August/34/0cbd16f8edf5e3e1ec23f1da43b791de_1534734408.jpg"
        >
          <div className="flex flex-col items-center gap-2">
            <p className="text-center text-blue-700 text-lg align-middle">
              <span className="mr-2">
                <img src="../../../public/assets/images/beach-ball.png" width={24} height={24} />
              </span>
              <span className="align-top">{location.sta_nm} 해수욕장</span>
              <span className="ml-2">
                <img src="../../../public/assets/images/beach-ball.png" width={24} height={24} />
              </span>
            </p>
            <p className="text-neutral-600">
              {location.sido_nm} {location.gugun_nm}{' '}
            </p>
            <div className="w-full pt-1 relative">
              <Tabs.Group aria-label="Full width tabs" style="fullWidth">
                <Tabs.Item title="날 씨 ☀️">
                  {!isLoading ? (
                    <div className="flex justify-between">
                      <div>
                        {sky[0]?.fcstValue && sky[0].fcstValue == 1 ? (
                          <div className="">
                            <img src="../../../public/assets/weather/day.svg" />
                            <p className="leading-6 text-center text-neutral-700">맑음!</p>
                          </div>
                        ) : sky[0]?.fcstValue == 2 ? (
                          <div>
                            <img src="../../../public/assets/weather/cloudy-day-3.svg" />
                            <p className="leading-6 text-center text-neutral-700">구름 많음!</p>
                          </div>
                        ) : sky[0]?.fcstValue >= 3 ? (
                          <div>
                            <img src="../../../public/assets/weather/cloudy.svg" />
                            <p className="leading-6 text-center text-neutral-700">흐림!</p>
                          </div>
                        ) : (
                          ''
                        )}
                      </div>
                      <div>
                        {pop[0]?.fcstValue && pop[0].fcstValue >= 0 && pop[0].fcstValue < 30 ? (
                          <div>
                            <img src="../../../public/assets/weather/cloudy-day-3.svg" />
                            <p className="leading-6 text-center text-neutral-700">
                              {pop[0].fcstValue}%
                            </p>
                          </div>
                        ) : pop[0]?.fcstValue >= 30 && pop[0].fcstValue < 60 ? (
                          <div>
                            <img src="../../../public/assets/weather/rainy-5.svg" />
                            <p className="leading-6 text-center text-neutral-700">
                              {pop[0].fcstValue}%
                            </p>
                          </div>
                        ) : pop[0]?.fcstValue >= 60 && pop[0].fcstValue < 100 ? (
                          <div>
                            <img src="../../../public/assets/weather/rainy-6.svg" />
                            <p className="leading-6 text-center text-neutral-700">
                              {pop[0]?.fcstValue}%
                            </p>
                          </div>
                        ) : (
                          ''
                        )}
                      </div>
                      <div className="mt-3 mr-2">
                        {tmp[0] && (
                          <div>
                            <img
                              src="../../../public/assets/weather/high-temperature.png"
                              width={44}
                              height={44}
                            />
                            <p className="mt-3 text-neutral-700">{tmp[0]?.fcstValue}°C</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="w-24 mx-auto">
                      <Loading />
                    </div>
                  )}
                </Tabs.Item>
                <Tabs.Item title="수 질 🌊">수질정보</Tabs.Item>
                <Tabs.Item title="백 사 장 🏖️">백사장정보</Tabs.Item>
              </Tabs.Group>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)}>X</button>
        </Card>
      </div>
    </div>
  )
}

export default MapOverlay
