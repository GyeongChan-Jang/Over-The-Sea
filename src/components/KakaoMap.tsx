import React, { useEffect, useRef, useState, useCallback } from 'react'
import axios from 'axios'
import Loading from './Loading'
import { Map, MapMarker } from 'react-kakao-maps-sdk'
import useGeolocation from '~/hooks/useGeolocation'
import { Tabs } from 'flowbite-react'
import ToggleButton from '~/components/UI/ToggleButton'
import SearchMap from './SearchMap'
import { ImportExportTwoTone } from '@mui/icons-material'

const BEACH_API_KEY =
  'YKhkbWsCsaTywu2QHRS70v5QGa6XB6aK%2FBVsqughtWFRU2Q00gi6uJ4WiXK6oirbBZmFThW4heHbnOa9XJpWZA%3D%3D'

const regions = [
  '부산',
  '인천',
  '울산',
  '경기',
  '강원',
  '충남',
  '전북',
  '전남',
  '경북',
  '경남',
  '제주'
]

interface RequestQuery {
  ServiceKey: string
  pageNo: number
  numOfRows: number
  SIDO_NM: string
  resultType: string
}

const KakaoMap = () => {
  const location = useGeolocation()
  const queryParams: RequestQuery = {
    ServiceKey: import.meta.env.VITE_BEACH_API_KEY,
    pageNo: 1,
    numOfRows: 100,
    SIDO_NM: '강원',
    resultType: 'json'
  }
  useEffect(() => {
    // 해수욕장 정보 가져오기
    async function getBeach() {
      try {
        const response = await axios.get(
          '/api/1192000/service/OceansBeachInfoService1/getOceansBeachInfo1',
          {
            params: queryParams
          }
        )
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    }
    getBeach()
  }, [])

  return (
    <div>
      <div className="container max-w-7xl mx-auto sm:w-9/12 lg:w-9/12">
        <div className="title lg:text-2xl py-4 sm:text-xl">
          <p className="text-slate-600">지도에서 해수욕장 찾기</p>
        </div>
        <div className="list pt-10">
          <div className="title flex justify-between">
            <h2>지역</h2>
            <ToggleButton />
          </div>
          <div className="mt-4">
            <Tabs.Group aria-label="Full width tabs" style="pills">
              {regions.map((region) => {
                return <Tabs.Item title={region}></Tabs.Item>
              })}
            </Tabs.Group>
          </div>
        </div>

        {location.loaded ? (
          <Map
            // @ts-ignore
            center={{ lat: location.coordinates?.lat, lng: location.coordinates?.lng }}
            className="w-full h-[360px] rounded ring ring-[#cfe8ef]"
            level={5}
          >
            <MapMarker
              // @ts-ignore
              position={{ lat: location.coordinates?.lat, lng: location.coordinates?.lng }}
            >
              <div className="text-red-500 text-lg text-center">현재 위치!</div>
            </MapMarker>
          </Map>
        ) : (
          <div className="absolute inset-y-1/2 left-1/2">
            <Loading />
          </div>
        )}
      </div>
      <div>
        <SearchMap />
      </div>
    </div>
  )
}

export default KakaoMap
