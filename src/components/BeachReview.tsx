import { collection, doc, onSnapshot, DocumentData } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '~/firebase/fbase'

const BeachReview = ({ params }: any) => {
  const [reviews, setReviews] = useState<DocumentData[]>([])

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'beaches', params.id, 'posts'), (snap) => {
      const data = snap.docs.map((doc: DocumentData) => doc.data())
      setReviews(data)
    })
  }, [])

  console.log(reviews)

  return (
    <div className=" flex md:mx-auto items-center justify-center mb-10 w-[90%] xs:ml-2">
      <div className="flex flex-col justify-center w-full mx-6">
        {reviews.map((review: any) => (
          <div className="grid grid-cols-1 gap-4 p-4 mb-8 border rounded-xl bg-white shadow-xl w-[96%]">
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
                </div>
                <p className="text-gray-400 text-sm">
                  {review.time?.toDate().toLocaleString().slice(0, -3)}
                </p>
              </div>
            </div>
            <p className="-mt-4 text-gray-500">{review.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BeachReview
