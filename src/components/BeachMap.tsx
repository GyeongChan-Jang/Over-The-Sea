import React, { useState, useRef, useEffect } from 'react'
import { Map, MapMarker, MarkerClusterer, ZoomControl, MapTypeControl } from 'react-kakao-maps-sdk'
import ToggleButton from '~/components/UI/ToggleButton'

import { Button, Card } from 'flowbite-react'

import useGeolocation from '~/hooks/useGeolocation'
import { LocationType } from '~/hooks/useGeolocation'
import MapOverlay from './UI/MapOverlay'
import { getSeaWater } from '~/utils/getSeaWater'
import { getSand } from '~/utils/getSand'

const BeachMap = ({
  regionClickHandler,
  setMap,
  map,
  locations,
  setLocationWeather,
  setIsOpen,
  isOpen
}: any) => {
  const regions = ['부산', '인천', '울산', '강원', '충남', '전북', '전남', '경북', '경남', '제주']
  const mapRef = useRef<any>()

  // info -> 마커 클릭시 해당 마커 위치 정보
  const [info, setInfo] = useState<any>()
  const [regionName, setRegionName] = useState<any>('')
  const [isWindow, setIsWindow] = useState<boolean>(false)
  const [markers, setMarkers] = useState<any>(true)
  const currentLocation: LocationType = useGeolocation()
  const [isCurrentLocation, setIsCurrentLocation] = useState<boolean>(false)
  const [seaWater, setSeaWater] = useState<any>([])
  const [sand, setSand] = useState<any>([])

  // 토글 -> 내 위치로 이동
  const toggleHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setRegionName('')
    setMarkers(true)
    setIsCurrentLocation(!isCurrentLocation)
  }

  const markerOverHandler = (location: any) => {
    if (!isOpen) {
      setIsWindow(true)
      setInfo(location)
    }
  }

  const markerOutHandler = () => {
    setIsWindow(false)
  }

  const markerClickHandler = async (location: any) => {
    setIsOpen(true)
    // weather 컴포넌트의 location을 전달하기 위해
    setLocationWeather(location)
    try {
      const res = await getSeaWater(location.sido_nm)
      res.item.filter((item: any) => {
        if (item.sta_nm === location.sta_nm) {
          setSeaWater(item)
        }
      })
    } catch (err) {
      console.log(err)
    }
    try {
      const res = await getSand(location.sido_nm)
      res.item.filter((item: any) => {
        if (item.sta_nm === location.sta_nm) {
          setSand(item)
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  const onClusterclick = (_target: any, cluster: any) => {
    const map = mapRef.current
    // 현재 지도 레벨에서 1레벨 확대한 레벨
    const level = map.getLevel() - 1
    // 지도를 클릭된 클러스터의 마커의 위치를 기준으로 확대합니다
    map.setLevel(level, { anchor: cluster.getCenter() })
  }

  // useEffect(() => {
  //   if (!map) return
  //   const ps = new kakao.maps.services.Places()

  //   ps.keywordSearch('이태원 맛집', (data, status, _pagination) => {
  //     if (status === kakao.maps.services.Status.OK) {
  //       // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
  //       // LatLngBounds 객체에 좌표를 추가합니다
  //       const bounds = new kakao.maps.LatLngBounds()
  //       let markers = []

  //       for (var i = 0; i < data.length; i++) {
  //         // @ts-ignore
  //         markers.push({
  //           position: {
  //             lat: data[i].y,
  //             lng: data[i].x
  //           },
  //           content: data[i].place_name
  //         })
  //         // @ts-ignore
  //         bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
  //       }
  //       setMarkers(markers)

  //       // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
  //       map.setBounds(bounds)
  //     }
  //   })
  // }, [map])

  return (
    <>
      <div className="list">
        <div className="title flex justify-between ">
          <span className="mt-2 text-blue-800 text-xl tracking-widest">{regionName}</span>
          <div className="flex gap-2">
            <span className="mt-2 text-[#333]">내 위치</span>
            <ToggleButton toggleHandler={toggleHandler} />
          </div>
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
        <div className="rounded-2xl shadow-2xl mb-10">
          <Map // 지도를 표시할 Container
            className="w-full h-[450px] bg-white rounded-2xl shadow-2xl"
            center={{
              // 지도의 중심좌표
              lat:
                isCurrentLocation && currentLocation.loaded
                  ? currentLocation.coordinates!.lat
                  : 37.5665,
              lng:
                isCurrentLocation && currentLocation.loaded
                  ? currentLocation.coordinates!.lng
                  : 126.978
            }}
            level={7} // 지도의 확대 레벨
            onCreate={setMap}
            ref={mapRef}
            onClick={() => setIsOpen(false)}
          >
            <MapTypeControl position={kakao.maps.ControlPosition.TOPLEFT} />
            <ZoomControl position={kakao.maps.ControlPosition.RIGHT} />
            <MarkerClusterer
              averageCenter={true}
              minLevel={12}
              onClusterclick={onClusterclick}
              disableClickZoom={true}
            >
              {markers && isCurrentLocation && currentLocation.loaded ? (
                <MapMarker
                  position={{
                    lat: currentLocation.coordinates!.lat,
                    lng: currentLocation.coordinates!.lng
                  }}
                  image={{
                    src: '/assets/images/navigation.png', // 마커이미지의 주소입니다
                    size: {
                      width: 38,
                      height: 38
                    }
                  }}
                />
              ) : (
                ''
              )}
              {locations?.map((location: any) => (
                <MapMarker
                  onClick={() => markerClickHandler(location)}
                  onMouseOver={() => markerOverHandler(location)}
                  onMouseOut={markerOutHandler}
                  position={{ lat: location.lat, lng: location.lon }}
                  key={`${location.sta_nm}-${location.latlng}`}
                  image={{
                    src: '/assets/images/parasol.png', // 마커이미지의 주소입니다
                    size: {
                      width: 38,
                      height: 38
                    }
                  }}
                  title={location.sta_nm} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                >
                  {isWindow && info && info.sta_nm === location.sta_nm ? (
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
                              해변 총 길이:{' '}
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
                              해변 종류:{' '}
                              <span className="text-amber-600">{location.beach_knd}</span>
                            </span>
                          ) : (
                            ''
                          )}
                        </span>
                      </p>
                    </div>
                  ) : isOpen && info && info.sta_nm === location.sta_nm ? (
                    <MapOverlay
                      setIsOpen={setIsOpen}
                      location={location}
                      seaWater={seaWater}
                      sand={sand}
                    />
                  ) : (
                    ''
                  )}
                </MapMarker>
              ))}
            </MarkerClusterer>
          </Map>
        </div>
      </div>
    </>
  )
}

export default BeachMap
