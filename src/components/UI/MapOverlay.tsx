import React, { useEffect, useState } from 'react'
import { Card, Tabs } from 'flowbite-react'
import useTime from '~/hooks/useTime'
import useConvertLatLng from '~/hooks/useConvertLatLng'
import { getWeather } from '~/utils/getWeather'
import Loading from '~/components/Loading'
import { Link } from 'react-router-dom'

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

const MapOverlay = ({ setIsOpen, location, seaWater, sand }: any) => {
  const [isLoading, setIsLoading] = useState(false)
  const [sky, setSky] = useState<any>([])
  const [pop, setPop] = useState<any>([])
  const [tmp, setTmp] = useState<any>([])
  const rs: any = useConvertLatLng({
    geoX: parseFloat(location.lon),
    geoY: parseFloat(location.lat)
  })

  const { today, nowForcastTime } = useTime()

  useEffect(() => {
    const { x, y } = rs.rs
    setIsLoading(false)
    getWeather({ today, nowForcastTime, nx: x, ny: y, numOfRows: 80 })
      .then((res) => {
        setIsLoading(false)
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
  console.log(location)

  return (
    <div className="overlaybox">
      <div className="max-w-xs -m-2 relative">
        <Card
          imgAlt="Meaningful alt text for an image that is not purely decorative"
          imgSrc="https://user-images.githubusercontent.com/90392240/189193054-cced26a2-a577-4b29-84b8-c5999bd8a003.jpg"
        >
          <button className="absolute z-10 right-2 top-2 text-white" onClick={() => setIsOpen(false)}>
            X
          </button>
          <div className="flex flex-col items-center gap-2">
            <p className="text-center text-blue-700 text-lg align-middle">
              <span className="mr-2">
                <img src="/assets/images/beach-ball.png" width={24} height={24} />
              </span>
              <Link className="focus: text-blue-800" to={`/detail/${location.sta_nm}`}>
                <span className="align-top hover:scale-105 hover:text-red-500 cursor-pointer text-xl">
                  {location.sta_nm} ????????????
                </span>
              </Link>
              <span className="ml-2">
                <img src="/assets/images/beach-ball.png" width={24} height={24} />
              </span>
            </p>
            <p className="text-neutral-600">
              {location.sido_nm} {location.gugun_nm}{' '}
            </p>
            <div className="w-full pt-1 relative ">
              <Tabs.Group aria-label="Full width tabs" style="fullWidth">
                <Tabs.Item title="??? ??? ??????">
                  {!isLoading ? (
                    <div className="flex justify-between">
                      <div>
                        {sky[0]?.fcstValue && sky[0].fcstValue == 1 ? (
                          <div className="">
                            <img src="/assets/weather/day.svg" />
                            <p className="leading-6 text-center text-neutral-700">??????!</p>
                          </div>
                        ) : sky[0]?.fcstValue == 3 ? (
                          <div>
                            <img src="/assets/weather/cloudy-day-3.svg" />
                            <p className="leading-6 text-center text-neutral-700">?????? ??????!</p>
                          </div>
                        ) : sky[0]?.fcstValue == 4 ? (
                          <div>
                            <img src="/assets/weather/cloudy.svg" />
                            <p className="leading-6 text-center text-neutral-700">??????!</p>
                          </div>
                        ) : (
                          ''
                        )}
                      </div>
                      <div>
                        {pop[0]?.fcstValue && pop[0].fcstValue >= 0 && pop[0].fcstValue < 30 ? (
                          <div>
                            <img src="/assets/weather/cloudy-day-3.svg" />
                            <p className="leading-6 text-center text-neutral-700">{pop[0].fcstValue}%</p>
                          </div>
                        ) : pop[0]?.fcstValue >= 30 && pop[0].fcstValue < 60 ? (
                          <div>
                            <img src="/assets/weather/rainy-5.svg" />
                            <p className="leading-6 text-center text-neutral-700">{pop[0].fcstValue}%</p>
                          </div>
                        ) : pop[0]?.fcstValue >= 60 && pop[0].fcstValue < 100 ? (
                          <div>
                            <img src="/assets/weather/rainy-6.svg" />
                            <p className="leading-6 text-center text-neutral-700">{pop[0]?.fcstValue}%</p>
                          </div>
                        ) : (
                          ''
                        )}
                      </div>
                      <div className="mt-3 mr-2">
                        {tmp[0] && (
                          <div>
                            <img src="/assets/weather/high-temperature.png" width={44} height={44} />
                            <p className="mt-3 text-neutral-700">{tmp[0]?.fcstValue}??C</p>
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
                <Tabs.Item title="??? ??? ????">
                  <div className="flex justify-around">
                    <div>
                      {seaWater.res_yn === '??????' ? (
                        <div>
                          <img src="/assets/images/appropriate.png" width={40} height={40} className="mt-1" />{' '}
                          <p className="mt-6 text-green-500 ">{seaWater.res_yn}</p>
                        </div>
                      ) : seaWater.res_yn === '?????????' ? (
                        <div>
                          <img src="/assets/images/inappropriate.png" width={40} height={40} />{' '}
                          <p className="mt-6 text-red-600">{seaWater.res_yn}</p>
                        </div>
                      ) : (
                        <p>?????? ??????</p>
                      )}
                    </div>
                    <div>
                      {seaWater.res1 ? (
                        <div>
                          <img src="/assets/images/bacteria.png" width={40} height={40} className="ml-3" />
                          <p className="mt-2 text-center mb-1 text-slate-500">
                            {seaWater.res1.includes('&lt;') ? seaWater.res1.replace('&lt;', '??????') : seaWater.res1}
                          </p>
                          <p>(?????????)</p>
                        </div>
                      ) : (
                        <p>?????? ??????</p>
                      )}
                    </div>
                    <div>
                      {seaWater.res1 ? (
                        <div>
                          <img src="/assets/images/biology.png" width={40} height={40} className="ml-3" />
                          <p className="mt-2 text-center mb-1 text-slate-500">
                            {seaWater.res2.includes('&lt;')
                              ? seaWater.res2.replace('&lt;', '??????').split('??????').reverse().join('??????')
                              : seaWater.res2}
                          </p>
                          <p>(?????????)</p>
                        </div>
                      ) : (
                        <p>?????? ??????</p>
                      )}
                    </div>
                  </div>
                </Tabs.Item>
                <Tabs.Item title="??? ??? ??? ???????">
                  <div className="flex justify-around">
                    <div>
                      {sand.res_yn === '??????' ? (
                        <div>
                          <img width={40} height={40} src="/assets/images/appropriate.png" />
                          <p className="mt-7 ml-1 text-green-500">{sand.res_yn}</p>
                        </div>
                      ) : (
                        <div>
                          <img width={40} height={40} src="/assets/images/inappropriate.png" />
                          <p className="mt-7 ml-1 text-red-600">{sand.res_yn}</p>
                        </div>
                      )}
                    </div>
                    <div>
                      {sand.res3 ? (
                        <div>
                          <img width={40} height={40} src="/assets/images/cadmium.png" className="ml-2.5" />
                          <p className="mt-2 text-center mb-1 text-slate-500">{sand.res1}</p>
                          <p>(?????????)</p>
                        </div>
                      ) : (
                        <p>?????? ??????</p>
                      )}
                    </div>
                    <div>
                      {sand.res3 ? (
                        <div>
                          <img width={40} height={40} src="/assets/images/mercury.png" className="ml-1" />
                          <p className=" mt-2 text-center mb-1 text-slate-500">{sand.res3}</p>
                          <p>(??????)</p>
                        </div>
                      ) : (
                        <p>?????? ??????</p>
                      )}
                    </div>
                  </div>
                </Tabs.Item>
              </Tabs.Group>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default MapOverlay
