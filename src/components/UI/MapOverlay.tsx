import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { Card, Tabs } from 'flowbite-react'
import { imageListClasses } from '@mui/material'
import useTime from '~/hooks/useTime'
import useConvertLatLng from '~/hooks/useConvertLatLng'
import { getWeather } from '~/utils/getWeather'
import Loading from '~/components/Loading'

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
    getWeather({ today, nowForcastTime, nx: x, ny: y })
      .then((res) => {
        setIsLoading(false)
        console.log(res)
        res?.map((item: any) => {
          if (item.category === 'SKY') {
            setSky(item)
          }

          if (item.category === 'POP') {
            setPop(item)
          }
          if (item.category === 'TMP') {
            setTmp(item)
          }
        })
      })
      .catch((err) => console.log(err))
  }, [])
  console.log(sky?.fcstValue)

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
                        {sky?.fcstValue && sky.fcstValue == 1 ? (
                          <div className="">
                            <img src="../../../public/assets/weather/day.svg" />
                            <p className="leading-6 text-center text-neutral-700">맑음!</p>
                          </div>
                        ) : sky.fcstValue == 2 ? (
                          <div>
                            <img src="../../../public/assets/weather/cloudy-day-3.svg" />
                            <p className="leading-6 text-center text-neutral-700">구름 많음!</p>
                          </div>
                        ) : sky.fcstValue == 4 ? (
                          <div>
                            <img src="../../../public/assets/weather/cloudy.svg" />
                            <p className="leading-6 text-center text-neutral-700">흐림!</p>
                          </div>
                        ) : (
                          ''
                        )}
                      </div>
                      <div>
                        {pop.fcstValue >= 0 && pop.fcstValue < 30 ? (
                          <div>
                            <img src="../../../public/assets/weather/cloudy-day-3.svg" />
                            <p className="leading-6 text-center text-neutral-700">
                              {pop.fcstValue}%
                            </p>
                          </div>
                        ) : pop.fcstValue >= 30 && pop.fcstValue < 60 ? (
                          <div>
                            <img src="../../../public/assets/weather/rainy-5.svg" />
                            <p className="leading-6 text-center text-neutral-700">
                              {pop.fcstValue}%
                            </p>
                          </div>
                        ) : pop.fcstValue >= 60 && pop.fcstValue < 100 ? (
                          <div>
                            <img src="../../../public/assets/weather/rainy-6.svg" />
                            <p className="leading-6 text-center text-neutral-700">
                              {pop.fcstValue}%
                            </p>
                          </div>
                        ) : (
                          ''
                        )}
                      </div>
                      <div className="mt-3 mr-2">
                        <img
                          src="../../../public/assets/weather/high-temperature.png"
                          width={44}
                          height={44}
                        />
                        <p className="mt-3 text-neutral-700">{tmp.fcstValue}°C</p>
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
