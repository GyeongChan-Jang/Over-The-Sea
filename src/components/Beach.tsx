import React, { useCallback, useEffect, useState } from 'react'
import {
  collection,
  getDocs,
  DocumentData,
  getDoc,
  onSnapshot,
  query,
  doc,
  updateDoc
} from 'firebase/firestore'
import { db } from '~/firebase/fbase'
import { Button } from 'flowbite-react'
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage'

import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { getBeach } from '~/utils/getBeach'
import { SettingsBackupRestoreSharp } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import Loading from './Loading'
import { regions } from '~/constants/regions.json'

const Beach = () => {
  const [beaches, setBeaches] = useState<any>([])
  const [regionBeach, setRegionBeach] = useState<any>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [downloadURL, setDownloadURL] = useState<any>([])

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
  }

  useEffect(() => {
    getAllBeaches()
  }, [])

  return (
    <div>
      <div className="container max-w-7xl xs:w-10/12 mx-auto sm:w-9/12 lg:w-9/12 relative">
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
              <ul className="justify-items-center grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 h-[600px] overflow-auto">
                {regionBeach.length === 0
                  ? beaches.map((beach: any, index: number) => (
                      <li
                        className="w-[140px] h-[140px] bg-red-300 relative overflow-hidden cursor-pointer rounded-lg shadow-xl"
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
                    ))
                  : regionBeach.map((beach: any, index: number) => (
                      <li
                        className="w-[140px] h-[140px] bg-red-300 relative overflow-hidden cursor-pointer rounded-lg shadow-xl"
                        key={index}
                      >
                        <Link to={`/detail/${beach.sta_nm}`}>
                          <img
                            className="absolute top-0 left-0 w-full h-full object-cover brightness-[.6] hover:scale-125 ease-in duration-300  "
                            width={140}
                            height={140}
                            src={beach.beachImage}
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
              <div className="relative left-1/2 -translate-x-10 translate-y-80">
                <Loading />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#0099ff"
            fillOpacity="1"
            d="M0,96L48,85.3C96,75,192,53,288,69.3C384,85,480,139,576,133.3C672,128,768,64,864,80C960,96,1056,192,1152,192C1248,192,1344,96,1392,48L1440,0L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  )
}

export default Beach
