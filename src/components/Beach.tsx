import React, { useEffect, useState } from 'react'
import { collection, getDocs, DocumentData } from 'firebase/firestore'
import { db } from '~/firebase/fbase'
import { Button } from 'flowbite-react'

import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const Beach = () => {
  const regions = [
    '부산',
    '인천',
    '울산',
    '강원',
    '충남',
    '전북',
    '전남',
    '경북',
    '경남',
    '제주',
    '전체'
  ]
  const [beaches, setBeaches] = useState<any>([])

  const getBeaches = async () => {
    const beachArr: any = []
    const beaches = await getDocs(collection(db, 'beaches'))
    beaches.forEach((beach) => beachArr.push(beach.data()))
    setBeaches(beachArr)
  }

  useEffect(() => {
    getBeaches()
  }, [])

  return (
    <div>
      <div className="container max-w-7xl xs:w-10/12 mx-auto sm:w-9/12 lg:w-9/12 bg-blue-300 ">
        <div>
          <div className="title flex justify-between "></div>
          <div className="divide h-[2px] bg-[#333] my-4" />
          <div className="my-4 flex flex-wrap justify-center gap-4 rounded-md shadow-xl p-4 bg-white">
            {regions.map((region: any) => (
              <Button key={region} color="dark" pill={true} name={region}>
                {region}
              </Button>
            ))}
          </div>
          <div className="card ">
            <ul className="grid grid-rows-4 grid-flow-col gap-4 overflow-auto ">
              {beaches.map((beach: any) => (
                <li className="w-[140px] h-[140px] bg-red-300 relative  ">
                  <img
                    width={140}
                    height={140}
                    src="../../public/assets/images/beach11.jpg"
                    alt=""
                  />
                  <div className="absolute top-1/2 text-rose-700 w-full h-[47px] text-center -mt-2 ">
                    {beach.sta_nm}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Beach
