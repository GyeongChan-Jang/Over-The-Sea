import React, { useEffect, useState } from 'react'
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore'
import { db } from '~/firebase/fbase'
import { Link } from 'react-router-dom'

const RecommendBeach = () => {
  const [LikeBeaches, setLikeBeaches] = useState<any>([])

  const getBeach = async () => {
    const q = query(collection(db, 'beaches'), orderBy('likes', 'desc'), limit(10))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      setLikeBeaches((prev: any) => [...prev, doc.data()])
    })
  }
  console.log(LikeBeaches)

  useEffect(() => {
    getBeach()
  }, [])

  return (
    <div>
      <ul className="grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 overflow-auto">
        {LikeBeaches.map((beach: any, index: number) => (
          <li
            className="w-[280px] h-[280px] bg-red-300 relative overflow-hidden cursor-pointer rounded-lg shadow-xl"
            key={index}
          >
            <Link to={`/detail/${beach.sta_nm}`}>
              <img
                className="absolute top-0 left-0 w-full h-full object-cover brightness-[.6] hover:scale-125 ease-in duration-300"
                width={140}
                height={140}
                src={beach.beachImage}
              />
              <div className="absolute top-1/2 text-white w-full text-center -mt-2 tracking-widest h-fit">
                {beach.sta_nm}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RecommendBeach
