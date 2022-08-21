import React, { useCallback, useEffect, useState } from 'react'
import { collection, getDocs, DocumentData, getDoc, onSnapshot, query } from 'firebase/firestore'
import { db } from '~/firebase/fbase'
import { Button } from 'flowbite-react'

import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { getBeach } from '~/utils/getBeach'
import { SettingsBackupRestoreSharp } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import Loading from './Loading'

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
  const [regionBeach, setRegionBeach] = useState<any>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const getAllBeaches = async () => {
    setIsLoading(true)
    const snapShot = await getDocs(collection(db, 'beaches'))
    snapShot.forEach((doc: DocumentData) => {
      setBeaches((prev: any) => [...prev, doc.data()])
    })
    setIsLoading(false)
  }

  const filterBeaches = (region: string) => {
    setRegionBeach('')
    if (region === '전체') {
      setRegionBeach(beaches)
    }
    beaches.map((beach: any) => {
      beach.sido_nm === region ? setRegionBeach((prev: any) => [...prev, beach]) : null
    })
    console.log(regionBeach)
  }

  useEffect(() => {
    getAllBeaches()

    console.log(regionBeach.length)
  }, [])
  console.log(beaches)

  return (
    <div>
      <div className="container max-w-7xl xs:w-10/12 mx-auto sm:w-9/12 lg:w-9/12 ">
        <div>
          <div className="title flex justify-between "></div>

          <div className="my-4 flex flex-wrap justify-center gap-4 rounded-md shadow-xl p-4 bg-white">
            {regions.map((region: any) => (
              <Button
                key={region}
                color="dark"
                pill={true}
                name={region}
                onClick={() => filterBeaches(region)}
              >
                {region}
              </Button>
            ))}
          </div>
          <div className="card">
            {!isLoading ? (
              <ul className="justify-items-center grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {regionBeach.length === 0
                  ? beaches.map((beach: any, index: number) => (
                      <li
                        className="w-[140px] h-[140px] bg-red-300 relative overflow-hidden cursor-pointer rounded-lg shadow-xl"
                        key={index}
                      >
                        <Link to={`/review/${beach.sta_nm}`}>
                          <img
                            className="absolute top-0 left-0 w-full h-full object-cover brightness-[.6] hover:scale-125 ease-in duration-300"
                            width={140}
                            height={140}
                            src="/assets/images/beach11.jpg"
                            alt=""
                          />
                          <div className="absolute top-1/2 text-white w-full text-center -mt-2 tracking-widest h-fit">
                            {beach.sta_nm}
                          </div>
                        </Link>
                      </li>
                    ))
                  : regionBeach.map((beach: any, index: number) => (
                      <li
                        className="w-[140px] h-[140px] bg-red-300 relative overflow-hidden cursor-pointer rounded-lg shadow-xl"
                        key={index}
                      >
                        <Link to={`/review/${beach.sta_nm}`}>
                          <img
                            className="absolute top-0 left-0 w-full h-full object-cover brightness-[.6] hover:scale-125 ease-in duration-300  "
                            width={140}
                            height={140}
                            src="/assets/images/beach11.jpg"
                            alt=""
                          />
                          <div className="absolute top-1/2 text-white w-full text-center -mt-2 tracking-widest h-fit">
                            {beach.sta_nm}
                          </div>
                        </Link>
                      </li>
                    ))}
              </ul>
            ) : (
              <div className="absolute inset-y-1/2 left-1/2 -translate-x-10 -translate-y-10">
                <Loading />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Beach
