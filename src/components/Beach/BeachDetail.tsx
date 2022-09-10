import React, { useEffect, useState } from 'react'
import BeachMap from './BeachMap'
import { BsHeart, BsFillHeartFill } from 'react-icons/bs'
import { FiShare2 } from 'react-icons/fi'
import { Map, MapMarker, MapTypeControl, ZoomControl } from 'react-kakao-maps-sdk'

import { Navigate, useNavigate, useParams } from 'react-router-dom'
import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  snapshotEqual,
  updateDoc,
  where
} from 'firebase/firestore'
import { db } from '~/firebase/fbase'
import { KakaoMapMarkerClustererContext } from 'react-kakao-maps-sdk/lib/@types/components/MarkerClusterer'
import BeachPost from './BeachPost'
import BeachReview from './BeachReview'
import { useSelector } from 'react-redux'
import { useUserSelector } from '~/store/store'
import Loading from '../Loading'

const ReviewDetail = () => {
  const params: any = useParams()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [postId, setPostId] = useState<any>()
  const [beach, setBeach] = useState<any>()
  const [like, setLike] = useState<boolean>(false)
  const [likes, setLikes] = useState<DocumentData[]>([])
  const user = useUserSelector((state) => state.user.userData)
  console.log(beach)

  const getOneBeach = async () => {
    setIsLoading(true)
    const docRef = doc(db, 'beaches', params.id)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      setBeach(docSnap.data())
    }

    setIsLoading(false)
  }

  useEffect(() => {
    getOneBeach()
  }, [])

  console.log(like)
  useEffect(() => {
    if (!params.id) return
    const unsub = onSnapshot(collection(db, 'beaches', params.id, 'likes'), (snap) => {
      console.log(snap.docs.map((doc: DocumentData) => doc.data()))
      // 새로고침시 하트 채워짐 유지
      snap.docs.map((doc: DocumentData) => doc.data().username === user.name && setLike(true))
      setLikes(snap.docs.map((doc: DocumentData) => doc.data()))
      console.log(like)
    })
    return () => unsub()
  }, [params.id])

  const likeClickHandler = async () => {
    if (!user.name) {
      alert('로그인 후 이용 가능합니다!')
      return
    }

    setLike((prev) => !prev)
    if (like) {
      await deleteDoc(doc(db, 'beaches', params.id, 'likes', user.name))
      await updateDoc(doc(db, 'beaches', params.id), {
        likes: arrayRemove(user.email)
      })
    } else {
      await setDoc(doc(db, 'beaches', params.id, 'likes', user.name), {
        username: user.name
      })
      await updateDoc(doc(db, 'beaches', params.id), {
        likes: arrayUnion(user.email)
      })
    }
  }

  const onShareHandler = async () => {
    try {
      await navigator.share({
        title: '떠나자 바다로, 바다어때!',
        text: `${beach.sta_nm} 해수욕장`,
        url: ''
      })
      console.log('공유 성공!')
    } catch (e) {
      alert('공유 기능이 지원되지 않는 브라우저입니다.')
    }
  }

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
                      <span className="text-rose-500">{beach?.link_tel ? beach?.link_tel : '정보 없음'}</span>
                    </em>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="mr-10 flex items-center gap-1">
                    <div className="flex">
                      {like && (
                        <BsFillHeartFill
                          className="cursor-pointer text-rose-500 text-2xl spin"
                          onClick={likeClickHandler}
                        />
                      )}
                      {!like && (
                        <BsHeart className="cursor-pointer text-rose-500 text-2xl spin" onClick={likeClickHandler} />
                      )}
                      <p className="p-1 ml-2 leading-4 text-xl w-4">{likes.length}</p>
                    </div>
                  </div>
                  <div>
                    <FiShare2 className="text-2xl cursor-pointer" onClick={onShareHandler} />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="divider flex flex-col gap-4 mb-4">
                <div className="text-center text-gray-700 text-xl">사진보기</div>
                <div className="divide h-[3px] bg-[#333] my-4 w-[90%] mx-auto rounded-lg"></div>
              </div>

              <div className="detail flex justify-center ">
                <img
                  width={300}
                  height={400}
                  className="w-full rounded-xl shadow-xl object-cover"
                  src={beach?.beachImage}
                />
              </div>
            </div>

            <div>
              <div className="divider flex flex-col gap-4 mt-4 ">
                <div className="text-center text-gray-700 text-xl">지도 보기</div>
                <div className="divide h-[3px] bg-[#333] my-4 w-[90%] mx-auto rounded-lg"></div>
              </div>
              <div className="map flex justify-center px-4 py-4">
                <Map
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
                  <MapTypeControl position={kakao.maps.ControlPosition.TOPLEFT} />
                  <ZoomControl position={kakao.maps.ControlPosition.RIGHT} />
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
                </Map>
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
