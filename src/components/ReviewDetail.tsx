import React from 'react'
import BeachMap from './BeachMap'
import { BsHeart, BsFillHeartFill } from 'react-icons/bs'
import { FiShare2 } from 'react-icons/fi'

const ReviewDetail = () => {
  return (
    <div>
      <div className="container max-w-7xl mx-auto sm:w-9/12 lg:w-9/12">
        {/* 해수욕장 정보 */}
        <div className="header text-center mt-6 p-10">
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl">해수욕장 이름</h2>
            <div>
              <span className="text-slate-400">시도명, 구군명</span>
            </div>
            <div className="emergency">
              <div>
                <em>보건소, 긴급전화</em>
              </div>
            </div>
            <div className="flex justify-center">
              <div>
                <BsHeart /> 10 <BsFillHeartFill />
              </div>
              <div>
                <FiShare2 />
              </div>
            </div>
          </div>
        </div>
        <div className="detail flex justify-center">
          <img src="/public/assets/images/sokchobeach.jpeg" alt="" />
        </div>
        <div className="map flex justify-center p-10">
          <BeachMap />
        </div>
        <div className="write text-center">
          <form action="">
            <label htmlFor="">댓글을 남겨주세요!</label>
            <span>
              <textarea
                name=""
                id=""
                cols={100}
                rows={3}
                placeholder="해수욕장 후기를 남겨주세요"
              ></textarea>
            </span>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ReviewDetail
