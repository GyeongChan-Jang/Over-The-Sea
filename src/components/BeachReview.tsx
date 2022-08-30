import { RemoveFromQueueTwoTone } from '@mui/icons-material'
import { collection, doc, onSnapshot, DocumentData, deleteDoc, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '~/firebase/fbase'
import { useUserSelector } from '~/store/store'

const BeachReview = ({ params }: any) => {
  const [reviews, setReviews] = useState<DocumentData[]>([])
  const user = useUserSelector((state) => state.user.userData)
  const [isEdit, setIsEdit] = useState(false)
  const [editContent, setEditContent] = useState('')

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'beaches', params.id, 'posts'), (snap) => {
      const data = snap.docs.map((doc: DocumentData) => doc.data())
      setReviews(data)
    })
  }, [])

  const deleteReviewHandler = async (review: DocumentData) => {
    const ok = window.confirm('정말 삭제하시겠습니까?')
    if (ok) {
      const docRef = doc(db, 'beaches', params.id, 'posts', review.pid)
      const data = await deleteDoc(docRef)
    }
  }

  const editReviewHandler = async (review: DocumentData) => {
    if (editContent === '') {
      alert('내용을 입력해주세요')
      return
    }
    setIsEdit(false)
    const docRef = doc(db, 'beaches', params.id, 'posts', review.pid)
    await updateDoc(docRef, {
      content: editContent
    })
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

                <p className="text-gray-400 text-sm mt-2">
                  {review.time?.toDate().toLocaleString().slice(0, -3)}
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="flex w-full">
                {review?.postImage && (
                  <p>
                    <img className="object-cover" width={250} height={150} src={review.postImage} />
                  </p>
                )}
                {isEdit && review.uid === user.uid ? (
                  <textarea
                    className="bg-gray-100 rounded border-gray-400 leading-normal resize-none py-2 px-3 font-xl placeholder-gray-700 focus:outline-none focus:bg-white font-nexonRegular w-full"
                    name="body"
                    placeholder={review.content}
                    required
                    onChange={(e) => setEditContent(e.target.value)}
                    value={editContent}
                  ></textarea>
                ) : (
                  <p className="text-gray-700 font-nexonRegular ml-4">{review.content}</p>
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
