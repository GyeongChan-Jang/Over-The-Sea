import { collection, doc, onSnapshot, DocumentData, deleteDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '~/firebase/fbase'
import { useUserSelector } from '~/store/store'

const BeachReview = ({ params }: any) => {
  const [reviews, setReviews] = useState<DocumentData[]>([])
  const user = useUserSelector((state) => state.user.userData)

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

  console.log(reviews)

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
                src={
                  review.userImage
                    ? review.userImage
                    : 'https://icons.iconarchive.com/icons/diversity-avatars/avatars/256/charlie-chaplin-icon.png'
                }
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
                  {review.uid === user.uid && (
                    <button
                      onClick={() => deleteReviewHandler(review)}
                      className="rounded text-white bg-red-700 p-2 font-nexonRegular font-bold hover:ring-2 ring-red-400 focus:ring-2"
                    >
                      삭제
                    </button>
                  )}
                </div>

                <p className="text-gray-400 text-sm">
                  {review.time?.toDate().toLocaleString().slice(0, -3)}
                </p>
              </div>
            </div>
            <div className="flex">
              {review.postImage ? (
                <div className="flex">
                  <p>
                    <img width={120} height={120} src={review.postImage} />
                  </p>
                  <p className="text-gray-700 font-nexonRegular ml-4">{review.content}</p>
                </div>
              ) : (
                <p className="-mt-4 text-gray-700 font-nexonRegular">{review.content}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BeachReview
