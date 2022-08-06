import React, { useState, useEffect, useRef } from 'react'
import { Map, MapMarker, MarkerClusterer } from 'react-kakao-maps-sdk'
import ToggleButton from '~/components/UI/ToggleButton'
import { getBeach } from '~/utils/getBeach'
import { Button } from 'flowbite-react'

const SearchMap = () => {
  const regions = ['부산', '인천', '울산', '강원', '충남', '전북', '전남', '경북', '경남', '제주']

  const [locations, setLocations] = useState<any>()
  const [info, setInfo] = useState<any>()
  const [map, setMap] = useState<any>()
  const [positions, setPositions] = useState<any>()
  const bounds = new kakao.maps.LatLngBounds()

  const regionClickHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    const { name } = e.currentTarget
    getBeach(name).then((res) => {
      console.log(res)
      setLocations(res)
    })

    if (locations !== undefined) {
      bounds.extend(new kakao.maps.LatLng(locations[0].lat, locations[0].lon))
      map.setBounds(bounds)
      map.setLevel(10)
    }
  }

  useEffect(() => {
    // getBeach(regions[0]).then((res) => {
    //   setLocations(res)
    // })
    // setPositions(clusterPositionsData.positions)
  }, [])

  return (
    <>
      <div className="list pt-10">
        <div className="title flex justify-between border-b-4">
          <h2>지역</h2>
          <ToggleButton />
        </div>
        <div className="my-4 flex flex-wrap justify-center gap-4 rounded shadow-lg p-4">
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
        <div>
          <Map // 지도를 표시할 Container
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
            level={10} // 지도의 확대 레벨
            onCreate={setMap}
          >
            {locations?.map((location: any) => (
              <MapMarker
                key={`${location.sta_nm}-${location.latlng}`}
                position={{ lat: location.lat, lng: location.lon }} // 마커를 표시할 위치
                image={{
                  src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png', // 마커이미지의 주소입니다
                  size: {
                    width: 24,
                    height: 35
                  }
                }}
                onClick={() => setInfo(location)}
                title={location.sta_nm} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
              >
                {info && info.sta_nm === location.sta_nm && (
                  <div className="w-full h-full p-2 text-sm rounded" key={location.num}>
                    <p className="text-blue-600">
                      해수욕장 이름: <span className="text-blue-500"> {location.sta_nm}</span>
                    </p>
                    <p className="text-red-600">
                      긴급전화: <span className="text-red-500"> {location.link_tel}</span>
                    </p>
                    <p className="text-slate-800">
                      해변 폭: <span className="text-gray-500"> {location.beach_wid}m</span>
                    </p>
                    <p className="text-slate-800">
                      해변 총 연장: <span className="text-gray-500"> {location.beach_len}m</span>
                    </p>
                  </div>
                )}
              </MapMarker>
            ))}
          </Map>
        </div>
      </div>
    </>
  )
}

export default SearchMap
