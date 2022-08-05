import React, { useState, useEffect } from 'react'
import { Map, MapMarker } from 'react-kakao-maps-sdk'
import ToggleButton from '~/components/UI/ToggleButton'
import { Tabs } from 'flowbite-react'
import { useDispatch } from 'react-redux'
import { useAppDispatch, useAppSelector } from '~/store/store'

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

const SearchMap = () => {
  const [info, setInfo] = useState()
  const [markers, setMarkers] = useState<any>([])
  const [map, setMap] = useState<any>()
  const dispatch = useAppDispatch()
  const searchData = useAppSelector((state) => state.search)
  const [input, setInput] = useState('')

  useEffect(() => {
    if (!map) return
    const ps = new kakao.maps.services.Places()

    ps.keywordSearch('이태원 맛집', (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new kakao.maps.LatLngBounds()
        let markers = []

        for (var i = 0; i < data.length; i++) {
          // @ts-ignore
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

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds)
      }
    })
  }, [map])
  return (
    <>
      <div className="list pt-10">
        <div className="title flex justify-between">
          <h2>지역</h2>
          <ToggleButton />
        </div>
        <div className="mt-4">
          <Tabs.Group aria-label="Full width tabs" style="pills">
            {regions.map((region) => {
              return <Tabs.Item title={region} key="region" onClick={}></Tabs.Item>
            })}
          </Tabs.Group>
        </div>
      </div>
      <Map // 로드뷰를 표시할 Container
        center={{
          lat: 37.566826,
          lng: 126.9786567
        }}
        style={{
          width: '100%',
          height: '350px'
        }}
        level={3}
        onCreate={setMap}
      >
        {markers.map((marker: any) => (
          <MapMarker
            key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
            position={marker.position}
            onClick={() => setInfo(marker)}
          >
            {info && info.content === marker.content && (
              <div style={{ color: '#000' }}>{marker.content}</div>
            )}
          </MapMarker>
        ))}
      </Map>
    </>
  )
}

export default SearchMap
