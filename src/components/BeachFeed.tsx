import { Button } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { regions } from '~/constants/regions.json'
import { collection, doc, getDocs } from 'firebase/firestore'
import { db } from '~/firebase/fbase'

const BeachFeed = () => {
  const [regionName, setRegionName] = useState<string>('')

  const buttonHanlder = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    const { name } = e.currentTarget
    setRegionName(name)
  }

  const getReview = async () => {
    const querySnapshot = await getDocs(collection(db, 'beaches'))
    querySnapshot.forEach(async (doc) => {
      const data = await getDocs(collection(db, 'beaches', doc.id, 'reviews'))
      console.log(data)
    })
  }

  useEffect(() => {
    getReview()
  }, [])

  return (
    <div>
      <div className="mt-10 container max-w-7xl xs:w-10/12 mx-auto sm:w-9/12 lg:w-9/12 relative">
        {/* 지역 버튼 */}
        <div className="my-4 flex flex-wrap justify-center gap-4 rounded-md shadow-xl p-4 bg-white">
          {regions.map((region: any) => (
            <Button key={region} color="dark" pill={true} name={region} onClick={buttonHanlder}>
              {region}
            </Button>
          ))}
        </div>
        {/* 글 */}
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl p-4">후기 모아보기!</h1>
          <div className="divider flex flex-col gap-4 mb-4">
            <div className="divide h-[3px] bg-[#333] my-4 w-[360px] mx-auto rounded-lg"></div>
          </div>
          <h2 className="text-2xl text-teal-800">{regionName ? regionName : '전체'}</h2>
        </div>
        {/* 포스팅 */}
        <div className="flex min-h-screen flex-wrap content-start justify-center mt-10">
          <div className="grid grid-cols-2 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-10">
            <div className="w-[90%] bg-white p-3 rounded-lg shadow-md hover:scale-105 ease-in duration-200 ">
              <img className="h-52 w-full object-cover" src="https://i.imgur.com/5yeBVeM.jpeg" />
              <ul className="mt-3 flex flex-wrap">
                <li className="mr-auto">
                  <a href="#" className="flex text-gray-400 hover:text-gray-600">
                    <svg
                      className="mr-0.5"
                      style={{ width: '24px', height: '24px' }}
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M21,12L14,5V9C7,10 4,15 3,20C5.5,16.5 9,14.9 14,14.9V19L21,12Z"
                      />
                    </svg>
                    1
                  </a>
                </li>
                <li className="mr-2">
                  <a href="#" className="flex text-gray-400 hover:text-gray-600">
                    <svg
                      className="mr-0.5"
                      style={{ width: '24px', height: '24px' }}
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z"
                      />
                    </svg>
                    24
                  </a>
                </li>
                <li className="mr-2">
                  <a href="#" className="flex text-gray-400 hover:text-gray-600">
                    <svg
                      className="mr-0.5"
                      style={{ width: '24px', height: '24px' }}
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M9,22A1,1 0 0,1 8,21V18H4A2,2 0 0,1 2,16V4C2,2.89 2.9,2 4,2H20A2,2 0 0,1 22,4V16A2,2 0 0,1 20,18H13.9L10.2,21.71C10,21.9 9.75,22 9.5,22V22H9Z"
                      />
                    </svg>
                    3
                  </a>
                </li>
                <li>
                  <a href="#" className="flex text-gray-400 hover:text-gray-600">
                    <svg
                      className="mr-0.5"
                      style={{ width: '24px', height: '24px' }}
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"
                      />
                    </svg>
                    3
                  </a>
                </li>
              </ul>
            </div>

            <div className="w-[90%] bg-white p-3 rounded-lg shadow-md hover:scale-105 ease-in duration-200">
              <img className="h-52 w-full object-cover" src="https://i.imgur.com/fjXFX93.jpeg" />
              <ul className="mt-3 flex flex-wrap">
                <li className="mr-auto">
                  <a href="#" className="flex text-gray-400 hover:text-gray-600">
                    <svg
                      className="mr-0.5"
                      style={{ width: '24px', height: '24px' }}
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M21,12L14,5V9C7,10 4,15 3,20C5.5,16.5 9,14.9 14,14.9V19L21,12Z"
                      />
                    </svg>
                    1
                  </a>
                </li>
                <li className="mr-2">
                  <a href="#" className="flex text-gray-400 hover:text-gray-600">
                    <svg
                      className="mr-0.5"
                      style={{ width: '24px', height: '24px' }}
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z"
                      />
                    </svg>
                    24
                  </a>
                </li>
                <li className="mr-2">
                  <a href="#" className="flex text-gray-400 hover:text-gray-600">
                    <svg
                      className="mr-0.5"
                      style={{ width: '24px', height: '24px' }}
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M9,22A1,1 0 0,1 8,21V18H4A2,2 0 0,1 2,16V4C2,2.89 2.9,2 4,2H20A2,2 0 0,1 22,4V16A2,2 0 0,1 20,18H13.9L10.2,21.71C10,21.9 9.75,22 9.5,22V22H9Z"
                      />
                    </svg>
                    3
                  </a>
                </li>
                <li>
                  <a href="#" className="flex text-gray-400 hover:text-gray-600">
                    <svg
                      className="mr-0.5"
                      style={{ width: '24px', height: '24px' }}
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"
                      />
                    </svg>
                    3
                  </a>
                </li>
              </ul>
            </div>

            <div className="w-[90%] bg-white p-3 rounded-lg shadow-md hover:scale-105 ease-in duration-200">
              <img className="h-52 w-full object-cover" src="https://i.imgur.com/ISpNf4j.jpeg" />
              <ul className="mt-3 flex flex-wrap">
                <li className="mr-auto">
                  <a href="#" className="flex text-gray-400 hover:text-gray-600">
                    <svg
                      className="mr-0.5"
                      style={{ width: '24px', height: '24px' }}
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M21,12L14,5V9C7,10 4,15 3,20C5.5,16.5 9,14.9 14,14.9V19L21,12Z"
                      />
                    </svg>
                    1
                  </a>
                </li>
                <li className="mr-2">
                  <a href="#" className="flex text-gray-400 hover:text-gray-600">
                    <svg
                      className="mr-0.5"
                      style={{ width: '24px', height: '24px' }}
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z"
                      />
                    </svg>
                    24
                  </a>
                </li>
                <li className="mr-2">
                  <a href="#" className="flex text-gray-400 hover:text-gray-600">
                    <svg
                      className="mr-0.5"
                      style={{ width: '24px', height: '24px' }}
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M9,22A1,1 0 0,1 8,21V18H4A2,2 0 0,1 2,16V4C2,2.89 2.9,2 4,2H20A2,2 0 0,1 22,4V16A2,2 0 0,1 20,18H13.9L10.2,21.71C10,21.9 9.75,22 9.5,22V22H9Z"
                      />
                    </svg>
                    3
                  </a>
                </li>
                <li>
                  <a href="#" className="flex text-gray-400 hover:text-gray-600">
                    <svg
                      className="mr-0.5"
                      style={{ width: '24px', height: '24px' }}
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"
                      />
                    </svg>
                    3
                  </a>
                </li>
              </ul>
            </div>

            <div className="w-[90%] bg-white p-3 rounded-lg shadow-md hover:scale-105 ease-in duration-200">
              <img className="h-52 w-full object-cover" src="https://i.imgur.com/DBpznrn.jpeg" />
              <ul className="mt-3 flex flex-wrap">
                <li className="mr-auto">
                  <a href="#" className="flex text-gray-400 hover:text-gray-600">
                    <svg
                      className="mr-0.5"
                      style={{ width: '24px', height: '24px' }}
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M21,12L14,5V9C7,10 4,15 3,20C5.5,16.5 9,14.9 14,14.9V19L21,12Z"
                      />
                    </svg>
                    1
                  </a>
                </li>
                <li className="mr-2">
                  <a href="#" className="flex text-gray-400 hover:text-gray-600">
                    <svg
                      className="mr-0.5"
                      style={{ width: '24px', height: '24px' }}
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z"
                      />
                    </svg>
                    24
                  </a>
                </li>
                <li className="mr-2">
                  <a href="#" className="flex text-gray-400 hover:text-gray-600">
                    <svg
                      className="mr-0.5"
                      style={{ width: '24px', height: '24px' }}
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M9,22A1,1 0 0,1 8,21V18H4A2,2 0 0,1 2,16V4C2,2.89 2.9,2 4,2H20A2,2 0 0,1 22,4V16A2,2 0 0,1 20,18H13.9L10.2,21.71C10,21.9 9.75,22 9.5,22V22H9Z"
                      />
                    </svg>
                    3
                  </a>
                </li>
                <li>
                  <a href="#" className="flex text-gray-400 hover:text-gray-600">
                    <svg
                      className="mr-0.5"
                      style={{ width: '24px', height: '24px' }}
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"
                      />
                    </svg>
                    3
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BeachFeed
