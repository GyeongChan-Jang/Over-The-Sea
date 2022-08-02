import { BlurLinear } from '@mui/icons-material'
import { blue } from '@mui/material/colors'
import React, { useEffect, useState } from 'react'

const Map = () => {
  const [myLocation, setMyLocation] = useState<{ latitude: number; longitude: number } | string>('')

  useEffect(() => {
    // 현재위치 가져오기
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setMyLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
      })
    } else {
      window.alert('현재 위치를 찾을 수 업습니다!')
    }
  }, [])

  useEffect(() => {
    if (typeof myLocation !== 'string') {
      const currentPosition = [myLocation.latitude, myLocation.longitude]

      let mapOptions = {
        center: new naver.maps.LatLng(currentPosition[0], currentPosition[1]),
        zoomeControl: true,
        zoom: 16
      }
      const initMap = () => {
        let map = null
        let marker = null
        map = new naver.maps.Map('map', mapOptions)
        marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(currentPosition[0], currentPosition[1]),
          map
        })
      }
      initMap()
    }
  }, [myLocation])

  return (
    <div>
      <div className="container max-w-7xl mx-auto sm:w-9/12 lg:w-9/12">
        <div className="title text-2xl py-4">
          <p>지도에서 해수욕장 찾기</p>
        </div>
        <div id="map" className="w-full h-[500px] rounded" />
      </div>
    </div>
  )
}

export default Map
