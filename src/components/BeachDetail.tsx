import React, { useEffect, useState } from 'react'
import BeachMap from './BeachMap'
import { BsHeart, BsFillHeartFill } from 'react-icons/bs'
import { FiShare2 } from 'react-icons/fi'
import { Map, MapMarker } from 'react-kakao-maps-sdk'

import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { useParams } from 'react-router-dom'
import { collection, doc, DocumentData, getDoc, getDocs, query, where } from 'firebase/firestore'
import { db } from '~/firebase/fbase'
import Loading from './Loading'
import { KakaoMapMarkerClustererContext } from 'react-kakao-maps-sdk/lib/@types/components/MarkerClusterer'
import BeachPost from './BeachPost'
import BeachReview from './BeachReview'

{
  /* <BsFillHeartFill /> */
}

const ReviewDetail = () => {
  const params: any = useParams()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [postId, setPostId] = useState<any>()
  const [beach, setBeach] = useState<any>()

  const getOneBeach = async () => {
    setIsLoading(true)
    const docRef = doc(db, 'beaches', params.id)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      setBeach(docSnap.data())
      console.log(docSnap.data())
    }

    setIsLoading(false)
  }
  console.log(beach)

  useEffect(() => {
    getOneBeach()
  }, [])

  return (
    <div>
      <div className="container max-w-7xl mx-auto sm:w-9/12 lg:w-9/12">
        {/* 해수욕장 정보 */}
        {!isLoading ? (
          <div className="wrapper px4">
            <div className="header text-center mt-6 px-10 py-6">
              <div className="flex flex-col gap-4">
                <h2>
                  <span className="text-3xl text-blue-900">"{beach?.sta_nm}"</span>{' '}
                  <span className="text-gray-800 text-2xl">해수욕장</span>{' '}
                </h2>
                <div>
                  <span className="text-slate-700">
                    <span className="text-lime-800 text-lg">{beach?.sido_nm}</span> /{' '}
                    <span className="text-cyan-800 text-lg">{beach?.gugun_nm}</span>
                  </span>
                </div>
                <div className="emergency">
                  <div className=" leading-8">
                    <em className="text-gray-700">
                      <span className="">보건소 / 긴급전화:</span>
                    </em>
                    <br />
                    <em>
                      <span className="text-rose-500">
                        {beach?.link_tel ? beach?.link_tel : '정보 없음'}
                      </span>
                    </em>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="mr-10 flex items-center gap-1">
                    <BsHeart /> <span className=" text-sm">10</span>
                  </div>
                  <div>
                    <FiShare2 />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="divider flex flex-col gap-4 mb-4">
                <div className="text-center text-gray-700 text-xl">사진보기</div>
                <div className="divide h-[3px] bg-[#333] my-4 w-[90%] mx-auto"></div>
              </div>

              <div className="detail flex justify-center ">
                <img
                  width={300}
                  height={300}
                  className="w-full rounded-xl shadow-xl /"
                  src="/public/assets/images/sokchobeach.jpeg"
                />
              </div>
            </div>

            <div>
              <div className="divider flex flex-col gap-4 mt-4 ">
                <div className="text-center text-gray-700 text-xl">지도 보기</div>
                <div className="divide h-[3px] bg-[#333] my-4 w-[90%] mx-auto"></div>
              </div>
              <div className="map flex justify-center px-4 py-4">
                {/* <Map
                  className="shadow-xl rounded-xl"
                  center={{
                    lat: beach?.lat,
                    lng: beach?.lon
                  }}
                  style={{
                    width: '100%',
                    height: '400px'
                  }}
                  level={3}
                >
                  <MapMarker
                    position={{
                      lat: beach?.lat,
                      lng: beach?.lon
                    }}
                    image={{
                      src: '/assets/images/beach-umbrella.png',
                      size: {
                        width: 38,
                        height: 38
                      }
                    }}
                  />
                </Map> */}
              </div>
            </div>

            <div>
              <div className="divider flex flex-col gap-4 my-4">
                <div className="text-center text-gray-700 text-xl">후기 보기</div>
                <div className="divide h-[3px] bg-[#333] my-4 w-[90%] mx-auto"></div>
              </div>
              {/* 댓글 폼 */}
              <BeachPost params={params} setPostId={setPostId} />

              {/* 댓글 */}

              <BeachReview params={params} />
            </div>
          </div>
        ) : (
          <div className="absolute inset-y-1/2 left-1/2 -translate-x-10 -translate-y-10">
            <Loading />
          </div>
        )}
      </div>
    </div>
  )
}

export default ReviewDetail
