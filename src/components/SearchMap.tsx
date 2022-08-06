import { CloseFullscreen } from '@mui/icons-material'
import React, { useState, useEffect, useRef } from 'react'
import { Map, MapMarker } from 'react-kakao-maps-sdk'
import ToggleButton from '~/components/UI/ToggleButton'
import { getBeach } from '~/utils/getBeach'

const SearchMap = () => {
  const [regions, setRegions] = useState([
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
  ])
  const [locations, setLocations] = useState<any>()

  useEffect(() => {
    getBeach(regions[0]).then((res) => {
      setLocations(res)
    })
  }, [])

  // locations.map((location: any) => console.log(typeof location.lat, location.lon))
  return (
    <>
      <div className="list pt-10">
        <div className="title flex justify-between">
          <h2>지역</h2>
          <ToggleButton />
        </div>
        <div className="mt-4">
          {regions.map((region: any) => (
            <button key={region} name={region}>
              {region}
            </button>
          ))}
        </div>
        <div>
          <Map // 지도를 표시할 Container
            center={{
              // 지도의 중심좌표
              lat: 33.450701,
              lng: 126.570667
            }}
            style={{
              // 지도의 크기
              width: '100%',
              height: '450px'
            }}
            level={3} // 지도의 확대 레벨
          >
            {locations?.map((location: any, index: any) => (
              <MapMarker
                key={`${location.sta_nm}-${location.latlng}`}
                position={{ lat: location.lat, lng: location.lon }} // 마커를 표시할 위치
                image={{
                  src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png', // 마커이미지의 주소입니다
                  size: {
                    width: 24,
                    height: 35
                  } // 마커이미지의 크기입니다
                }}
                title={location.sta_nm} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
              />
            ))}
          </Map>
        </div>
      </div>
    </>
  )
}

export default SearchMap
