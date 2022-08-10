import React, { useEffect, useRef, useState, useCallback } from 'react'
import axios from 'axios'
import Loading from './Loading'
import { Map, MapMarker } from 'react-kakao-maps-sdk'
import useGeolocation from '~/hooks/useGeolocation'
import { Tabs } from 'flowbite-react'
import ToggleButton from '~/components/UI/ToggleButton'
import BeachMap from './BeachMap'
import { getBeach } from '~/utils/getBeach'
import Weather from './Weather'

const regions = ['부산', '인천', '울산', '강원', '충남', '전북', '전남', '경북', '경남', '제주']

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
    getBeach('강원')
  }, [])

  return (
    <div>
      <div className="container max-w-7xl mx-auto sm:w-9/12 lg:w-9/12">
        <div className="title lg:text-2xl py-4 sm:text-xl">
          <p className="text-slate-600">지도에서 해수욕장 찾기</p>
        </div>
        <div className="list"></div>
        {location.loaded ? (
          <>
            {/* <Map
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
            </Map> */}
            <BeachMap />
          </>
        ) : (
          <div className="absolute inset-y-1/2 left-1/2">
            <Loading />
          </div>
        )}
      </div>
      {location.loaded && (
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
