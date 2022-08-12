import React, { useState, useEffect, useRef } from 'react'
import { Map, MapMarker, MarkerClusterer, Roadview } from 'react-kakao-maps-sdk'
import ToggleButton from '~/components/UI/ToggleButton'
import { getBeach } from '~/utils/getBeach'
import { Button, Card } from 'flowbite-react'
import Weather from './Weather'
import useGeolocation from '~/hooks/useGeolocation'
import { LocationType } from '~/hooks/useGeolocation'
import MapOverlay from './UI/MapOverlay'
import { getSeaWater } from '~/utils/getSeaWater'
import { getSand } from '~/utils/getSand'

const BeachMap = ({
  regionName,
  setRegionName,
  regionClickHandler,
  setMap,
  map,
  locations
}: any) => {
  const regions = ['부산', '인천', '울산', '강원', '충남', '전북', '전남', '경북', '경남', '제주']
  const mapRef = useRef<any>()

  // info -> 마커 클릭시 해당 마커 위치 정보
  const [info, setInfo] = useState<any>()

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isWindow, setIsWindow] = useState<boolean>(false)
  const [markers, setMarkers] = useState<any>([])
  const currentLocation: LocationType = useGeolocation()
  const [isCurrentLocation, setIsCurrentLocation] = useState<boolean>(false)
  const [seaWater, setSeaWater] = useState<any>([])
  const [sand, setSand] = useState<any>([])

  useEffect(() => {}, [])

  // 토글 -> 내 위치로 이동
  const toggleHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsCurrentLocation(!isCurrentLocation)
    console.log(isCurrentLocation)
    console.log(e)
  }

  const markerOverHandler = (location: any) => {
    if (!isOpen) {
      setIsWindow(true)
      setInfo(location)
      console.log(location)
    }
  }

  const markerOutHandler = () => {
    setIsWindow(false)
  }

  const markerClickHandler = async (location: any) => {
    setIsOpen(true)
    try {
      const res = await getSeaWater(location.sido_nm)
      // console.log(res)
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
      console.log(res)
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
            <MarkerClusterer
              averageCenter={true}
              minLevel={12}
              onClusterclick={onClusterclick}
              disableClickZoom={true}
            >
              {isCurrentLocation && currentLocation.loaded ? (
                <MapMarker
                  position={{
                    lat: currentLocation.coordinates!.lat,
                    lng: currentLocation.coordinates!.lng
                  }}
                  image={{
                    src: '../../public/assets/images/navigation.png', // 마커이미지의 주소입니다
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
                    src: '../../public/assets/images/parasol.png', // 마커이미지의 주소입니다
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
