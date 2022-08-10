import React, { useState, useEffect, useRef } from 'react'
import { Map, MapMarker, MarkerClusterer } from 'react-kakao-maps-sdk'
import ToggleButton from '~/components/UI/ToggleButton'
import { getBeach } from '~/utils/getBeach'
import { Button, Card } from 'flowbite-react'
import Weather from './Weather'
import useGeolocation from '~/hooks/useGeolocation'
import { LocationType } from '~/hooks/useGeolocation'

const SearchMap = () => {
  const regions = ['부산', '인천', '울산', '강원', '충남', '전북', '전남', '경북', '경남', '제주']

  const [locations, setLocations] = useState<any>()
  const [info, setInfo] = useState<any>()
  const [map, setMap] = useState<any>()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [markers, setMarkers] = useState<any>([])
  const currentLocation: LocationType = useGeolocation()
  const [isCurrentLocation, setIsCurrentLocation] = useState<boolean>(false)

  const regionClickHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    const { name } = e.currentTarget
    getBeach(name).then((res) => {
      console.log(res)
      setLocations(res)
    })

    if (!map) return
    const ps = new kakao.maps.services.Places()
    ps.keywordSearch(name, (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        const bounds = new kakao.maps.LatLngBounds()
        let markers = []
        for (let i = 0; i < data.length; i++) {
          markers.push({
            position: {
              lat: data[i].y,
              lng: data[i].x
            },
            content: data[i].place_name
          })
          // @ts-ignore
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
        }
        setMarkers(markers)
        map.setBounds(bounds)
      }
    })
  }

  // 토글 -> 내 위치로 이동
  const toggleHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsCurrentLocation((prev) => !prev)
  }

  const markerClickHandler = (location: any) => {
    setInfo(location)
    console.log(location)
  }

  useEffect(() => {}, [])

  return (
    <>
      <div className="list pt-10">
        <div className="title flex justify-between ">
          <h1>지역</h1>
          <ToggleButton toggleHandler={toggleHandler} />
        </div>
        <div className="divide h-[2px] bg-[#333] my-4"></div>
        <div className="my-4 flex flex-wrap justify-center gap-4 rounded-md shadow-xl p-4 bg-white">
          {regions.map((region: any) => (
            <Button
              color="dark"
              pill={true}
              key={region}
              name={region}
              onClick={regionClickHandler}
            >
              {region}
            </Button>
          ))}
        </div>
        <div className="rounded-2xl shadow-2xl">
          <Map // 지도를 표시할 Container
            className="w-full h-[360px] bg-white rounded-2xl shadow-2xl"
            center={{
              // 지도의 중심좌표
              lat: 35.1796,
              lng: 129.0756
            }}
            style={{
              // 지도의 크기
              width: '100%',
              height: '450px'
            }}
            level={7} // 지도의 확대 레벨
            onCreate={setMap}
          >
            {locations?.map((location: any) => (
              <MapMarker
                onMouseOver={() => markerClickHandler(location)}
                key={`${location.sta_nm}-${location.latlng}`}
                position={{ lat: location.lat, lng: location.lon }}
                // position={{ lat: location.lat, lng: location.lon }} // 마커를 표시할 위치
                image={{
                  src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png', // 마커이미지의 주소입니다
                  size: {
                    width: 24,
                    height: 35
                  }
                }}
                title={location.sta_nm} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
              >
                {info && info.sta_nm === location.sta_nm && (
                  <div
                    style={{
                      borderRadius: '12px',
                      backgroundColor: '#fff',
                      padding: '14px',
                      margin: '-4px'
                    }}
                    className="w-full h-full p-2 rounded-lg text-sm shadow-2xl"
                    key={location.num}
                  >
                    <p className="text-blue-500 text-center pb-1">
                      <span className="text-blue-600 text-lg"> "{location.sta_nm}"</span>
                      <span> 해수욕장</span>
                    </p>
                    <p className="text-slate-800">
                      <span className="text-gray-500">
                        {location.beach_wid ? (
                          <span className="text-black">
                            해변 폭: <span className="text-gray-500">{location.beach_wid}m</span>
                          </span>
                        ) : (
                          ''
                        )}
                      </span>
                    </p>
                    <p className="text-slate-800">
                      <span className="text-gray-500">
                        {location.beach_len ? (
                          <span className="text-black">
                            해변 총길이:{' '}
                            <span className="text-gray-500">{location.beach_len}m</span>
                          </span>
                        ) : (
                          ''
                        )}
                      </span>
                    </p>
                    <p className="text-slate-800">
                      <span className="text-gray-500">
                        {location.beach_knd ? (
                          <span className="text-black">
                            해변종류: <span className="text-amber-600">{location.beach_knd}</span>
                          </span>
                        ) : (
                          ''
                        )}
                      </span>
                    </p>
                  </div>
                )}
              </MapMarker>
            ))}
          </Map>
        </div>
        {/* <div className="mt-4">
          <Weather />
        </div> */}
      </div>
    </>
  )
}

export default SearchMap
