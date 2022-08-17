import React, { useEffect, useState } from 'react'
import Loading from './Loading'
import useGeolocation from '~/hooks/useGeolocation'
import BeachMap from './BeachMap'
import { getBeach } from '~/utils/getBeach'
import Weather from './Weather'
import { useUserSelector } from '~/store/store'

interface RequestQuery {
  ServiceKey: string
  pageNo: number
  numOfRows: number
  SIDO_NM: string
  resultType: string
}

const KakaoMap = () => {
  const { userData } = useUserSelector((state) => state.user)
  console.log(userData)
  // 현재 위치 가져오기
  const currentLocation = useGeolocation()
  const [map, setMap] = useState<any>()
  const [locations, setLocations] = useState<any>()
  const [locationWeather, setLocationWeather] = useState<any>()
  // 마커 클릭시 overlay 오픈여부
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const regionClickHandler = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    const { name } = e.currentTarget
    try {
      const res = await getBeach(name)
      setLocations(res)
      if (!map) return
      const bounds = new kakao.maps.LatLngBounds()
      for (let i = 0; i < res.length; i++) {
        bounds.extend(new kakao.maps.LatLng(res[i].lat, res[i].lon))
      }
      map.panTo(bounds)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div>
      <div className="container max-w-7xl mx-auto sm:w-9/12 lg:w-9/12 xs:w-10/12">
        {currentLocation.loaded ? (
          <>
            <div className="title lg:text-2xl py-4 sm:text-xl">
              <p className="text-slate-600 pt-2">지도에서 해수욕장 찾기</p>
            </div>
            <BeachMap
              regionClickHandler={regionClickHandler}
              setMap={setMap}
              map={map}
              locations={locations}
              setLocationWeather={setLocationWeather}
              setIsOpen={setIsOpen}
              isOpen={isOpen}
            />

            {isOpen && (
              <>
                <div className="title lg:text-2xl py-4 sm:text-xl">
                  <p className="text-slate-600 pt-2">날씨 정보</p>
                </div>
                <Weather locationWeather={locationWeather} />
              </>
            )}
          </>
        ) : (
          <div className="absolute inset-y-1/2 left-1/2 -translate-x-10 -translate-y-10">
            <Loading />
          </div>
        )}
      </div>
      {currentLocation.loaded && (
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#0099ff"
              fillOpacity="1"
              d="M0,96L48,85.3C96,75,192,53,288,69.3C384,85,480,139,576,133.3C672,128,768,64,864,80C960,96,1056,192,1152,192C1248,192,1344,96,1392,48L1440,0L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      )}
    </div>
  )
}

export default KakaoMap
