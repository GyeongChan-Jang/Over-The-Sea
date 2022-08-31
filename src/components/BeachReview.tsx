import { RemoveFromQueueTwoTone } from '@mui/icons-material'
import {
  collection,
  doc,
  onSnapshot,
  DocumentData,
  deleteDoc,
  updateDoc,
  arrayRemove,
  setDoc,
  arrayUnion
} from 'firebase/firestore'
import React, { useEffect, useRef, useState } from 'react'
import { db } from '~/firebase/fbase'
import { useUserSelector } from '~/store/store'
import { BsHeart, BsFillHeartFill } from 'react-icons/bs'

const BeachReview = ({ params }: any) => {
  const [reviews, setReviews] = useState<DocumentData[]>([])
  const user = useUserSelector((state) => state.user.userData)
  const [isEdit, setIsEdit] = useState(false)
  const [editContent, setEditContent] = useState('')
  const [like, setLike] = useState(false)
  const [likes, setLikes] = useState<DocumentData[]>([])

  const textRef = useRef<any>('')

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'beaches', params.id, 'posts'), (snap) => {
      const data = snap.docs.map((doc: DocumentData) => doc.data())
      setReviews(data)
      console.log(data)
      // 새로고침시 하트 채워짐 유지
      data.map((item) =>
        item.likes && item.likes.includes(user.email) ? setLike(true) : setLike(false)
      )
    })
    return () => unsub()
  }, [params.id])

  const deleteReviewHandler = async (review: DocumentData) => {
    const ok = window.confirm('정말 삭제하시겠습니까?')
    if (ok) {
      const docRef = doc(db, 'beaches', params.id, 'posts', review.pid)
      await deleteDoc(docRef)
    }
  }

  const editReviewHandler = async (review: DocumentData) => {
    if (editContent === '') {
      if (textRef.current.value === review.content) {
        setIsEdit(false)
        return
      } else {
        alert('내용을 입력해주세요!')
        return
      }
    }
    setIsEdit(false)
    const docRef = doc(db, 'beaches', params.id, 'posts', review.pid)
    await updateDoc(docRef, {
      content: editContent
    })
  }

  const likeClickHandler = async (review: any) => {
    if (!user.name) {
      alert('로그인 후 이용 가능합니다!')
      return
    }
    setLike((prev) => !prev)
    if (like) {
      await deleteDoc(doc(db, 'beaches', params.id, 'posts', review.pid, 'likes', user.name))
      await updateDoc(doc(db, 'beaches', params.id, 'posts', review.pid), {
        likes: arrayRemove(user.email)
      })
    } else {
      await setDoc(doc(db, 'beaches', params.id, 'posts', review.pid, 'likes', user.name), {
        username: user.name
      })
      await updateDoc(doc(db, 'beaches', params.id, 'posts', review.pid), {
        likes: arrayUnion(user.email)
      })
    }
  }

  return (
    <div className=" flex md:mx-auto items-center justify-center mb-10 w-[90%] xs:ml-2">
      <div className="flex flex-col justify-center w-full mx-6">
        {reviews.map((review: any, index) => (
          <div
            key={index}
            className="grid grid-cols-1 gap-4 p-4 mb-8 border rounded-xl bg-white shadow-xl w-[96%]"
          >
            <div className=" flex gap-4">
              <img
                src={review.userImage ? review.userImage : '/assets/images/noProfileImage.png'}
                className="relative rounded-xl -top-8 -mb-4 bg-white border h-20 w-20"
                alt=""
                loading="lazy"
              />
              <div className="flex flex-col w-full">
                <div className="flex flex-row justify-between">
                  <p className="relative text-xl whitespace-nowrap truncate overflow-hidden">
                    {review.userName}
                  </p>

                  <a className="text-gray-500 text-xl" href="#">
                    <i className="fa-solid fa-trash"></i>
                  </a>
                  <div>
                    {review.uid === user.uid && isEdit ? (
                      <button
                        onClick={() => editReviewHandler(review)}
                        className="mr-2 text-white rounded bg-gray-600 p-2 font-nexonRegular font-bold hover:ring-2 ring-gray-400 focus:ring-2"
                      >
                        완료
                      </button>
                    ) : review.uid === user.uid && !isEdit ? (
                      <button
                        onClick={() => setIsEdit((prev) => !prev)}
                        className="mr-2 text-white rounded bg-gray-600 p-2 font-nexonRegular font-bold hover:ring-2 ring-gray-400 focus:ring-2"
                      >
                        수정
                      </button>
                    ) : null}

                    {review.uid === user.uid && (
                      <button
                        onClick={() => deleteReviewHandler(review)}
                        className="rounded text-white bg-red-700 p-2 font-nexonRegular font-bold hover:ring-2 ring-red-400 focus:ring-2"
                      >
                        삭제
                      </button>
                    )}
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <p className="text-gray-400 text-sm mt-2">
                    {review.time?.toDate().toLocaleString().slice(0, -3)}
                  </p>
                  <p className="flex items-end">
                    {like && (
                      <BsFillHeartFill
                        onClick={() => likeClickHandler(review)}
                        className="mr-2 cursor-pointer text-rose-500 text-lg"
                      />
                    )}
                    {!like && (
                      <BsHeart
                        onClick={() => likeClickHandler(review)}
                        className="mr-2 cursor-pointer text-rose-500 text-lg"
                      />
                    )}
                    <span className="mb-[1px]">{review?.likes?.length}</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex">
              <div className="xs:block xs:text-center sm:block md:flex md:justify-around lg:flex lg:justify-around flex w-full">
                {review?.postImage && (
                  <p className="">
                    <img
                      className="object-cover rounded "
                      width={250}
                      height={150}
                      src={review.postImage}
                    />
                  </p>
                )}
                {isEdit && review.uid === user.uid ? (
                  <textarea
                    className="ml-2 bg-slate-50 rounded border-0 border-gray-400 leading-normal resize-none py-2 px-3 font-xl placeholder-gray-700 focus:outline-none focus:bg-white font-nexonRegular w-full"
                    name="body"
                    required
                    ref={textRef}
                    onChange={(e) => setEditContent(e.target.value)}
                    value={review.content}
                  ></textarea>
                ) : (
                  <p className="xs:mt-2 md:ml-2 md:text-start text-gray-700 font-nexonRegular">
                    {review.content}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BeachReview
