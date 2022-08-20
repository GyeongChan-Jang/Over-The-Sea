import React, { useEffect, useState } from 'react'
import BeachMap from './BeachMap'
import { BsHeart, BsFillHeartFill } from 'react-icons/bs'
import { FiShare2 } from 'react-icons/fi'
import { Map } from 'react-kakao-maps-sdk'

import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { useParams } from 'react-router-dom'
import { collection, doc, DocumentData, getDoc, getDocs, query, where } from 'firebase/firestore'
import { db } from '~/firebase/fbase'

{
  /* <BsFillHeartFill /> */
}

const ReviewDetail = () => {
  const params = useParams()
  console.log(params)

  const [beach, setBeach] = useState<any>()

  const getOneBeach = async () => {
    // const docRef = doc(db, 'beaches', params.id)
    // const docSnap = await getDoc(docRef)
  }

  useEffect(() => {
    getOneBeach()
  }, [])

  console.log(beach)

  return (
    <div>
      <div className="container max-w-7xl mx-auto sm:w-9/12 lg:w-9/12">
        {/* 해수욕장 정보 */}
        <div className="wrapper px4">
          <div className="header text-center mt-6 px-10 py-6">
            <div className="flex flex-col gap-4">
              <h2 className="text-3xl text-blue-900">해수욕장 이름</h2>
              <div>
                <span className="text-slate-400">시도명, 구군명</span>
              </div>
              <div className="emergency">
                <div>
                  <em>보건소, 긴급전화</em>
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
                className="w-full rounded-xl shadow-xl"
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
              <Map // 지도를 표시할 Container
                className="shadow-xl rounded-xl"
                center={{
                  // 지도의 중심좌표
                  lat: 33.450701,
                  lng: 126.570667
                }}
                style={{
                  // 지도의 크기
                  width: '100%',
                  height: '400px'
                }}
                level={3} // 지도의 확대 레벨
              />
            </div>
          </div>

          <div>
            <div className="divider flex flex-col gap-4 my-4">
              <div className="text-center text-gray-700 text-xl">후기 보기</div>
              <div className="divide h-[3px] bg-[#333] my-4 w-[90%] mx-auto"></div>
            </div>
            {/* 댓글 폼 */}
            <div>
              <div className="flex mx-auto items-center justify-center mb-10">
                <form className="w-full max-w-xl bg-white rounded-xl px-4 pt-2 shadow-xl">
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <h2 className="px-4 pt-3 pb-2 text-gray-800 text-sm">
                      <span className="text-blue-900 ">해수욕장</span> 후기를 남겨주세요!
                    </h2>
                    <div className="w-full md:w-full px-3 mb-2 mt-2 text-center">
                      <textarea
                        className=" bg-gray-100 rounded xlrder border-gray-400 leading-normal resize-none w-[90%] h-20 py-2 px-3 font-medium placeholder-gray-400 focus:outline-none focus:bg-white font-jalnanche"
                        name="body"
                        placeholder="소중한 후기"
                        required
                      ></textarea>
                    </div>
                    <div className=" md:w-full flex justify-end px-7 w-[100%]">
                      <div className="-mr-1">
                        <input
                          type="submit"
                          className="bg-white text-gray-600 font-medium py-2 px-4 border border-gray-400 rounded-xl tracking-wide mr-1 hover:bg-gray-100 cursor-pointer font-jalnanche"
                          value="완료"
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* 댓글 */}
            <div className="flex justify-center relative top-1/3">
              <div className="relative grid grid-cols-1 gap-4 p-4 mb-8 border rounded-xl bg-sky-100 shadow-xl">
                <div className="relative flex gap-4">
                  <img
                    src="https://icons.iconarchive.com/icons/diversity-avatars/avatars/256/charlie-chaplin-icon.png"
                    className="relative rounded-xl -top-8 -mb-4 bg-white border h-20 w-20"
                    alt=""
                    loading="lazy"
                  />
                  <div className="flex flex-col w-full">
                    <div className="flex flex-row justify-between">
                      <p className="relative text-xl whitespace-nowrap truncate overflow-hidden">
                        COMMENTOR
                      </p>
                      <a className="text-gray-500 text-xl" href="#">
                        <i className="fa-solid fa-trash"></i>
                      </a>
                    </div>
                    <p className="text-gray-400 text-sm">20 April 2022, at 14:88 PM</p>
                  </div>
                </div>
                <p className="-mt-4 text-gray-500">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />
                  Maxime quisquam vero adipisci beatae voluptas dolor ame.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewDetail
