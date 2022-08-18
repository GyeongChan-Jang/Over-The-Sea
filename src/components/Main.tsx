import React, { useEffect } from 'react'
import { Carousel } from 'flowbite-react'
import Hero from '~/components/Banner'
import Banner from '~/components/Banner'
import { useSelector } from 'react-redux'
import { useUserSelector } from '~/store/store'
import { db } from '~/firebase/fbase'
import { getBeach } from '~/utils/getBeach'
import { addDoc, collection, doc, getDoc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore'
import useGetAllBeach from '~/hooks/useGetAllBeach'

const Main = () => {
  const regions = ['부산', '인천', '울산', '강원', '충남', '전북', '전남', '경북', '경남', '제주']

  // const getAllBeach = async () => {
  //   const allBeachArr = []
  //   for (let i = 0; i < regions.length; i++) {
  //     const allBeach = await getBeach(regions[i])
  //     allBeachArr.push(...allBeach)
  //   }
  // console.log(allBeachArr)

  // const busan = allBeachArr.filter((beach) => beach.sido_nm === '부산')
  // const incheon = allBeachArr.filter((beach) => beach.sido_nm === '인천')
  // const ulsan = allBeachArr.filter((beach) => beach.sido_nm === '울산')
  // const gwangju = allBeachArr.filter((beach) => beach.sido_nm === '강원')
  // const chungnam = allBeachArr.filter((beach) => beach.sido_nm === '충남')
  // const jeonbuk = allBeachArr.filter((beach) => beach.sido_nm === '전북')
  // const jeonnam = allBeachArr.filter((beach) => beach.sido_nm === '전남')
  // const gyeongbuk = allBeachArr.filter((beach) => beach.sido_nm === '경북')
  // const gyeongnam = allBeachArr.filter((beach) => beach.sido_nm === '경남')
  // const jeju = allBeachArr.filter((beach) => beach.sido_nm === '제주')

  // for (const region of regions) {
  //   await setDoc(doc(db, 'beaches', region), { ...allBeachArr })
  // }

  // like 필드 추가
  // for (const beach of allBeachArr) {
  //   const docRef = doc(db, 'beaches', beach.sta_nm)
  //   await updateDoc(docRef, { like: 0})
  // }

  // for (const region of regions) {
  //   const regionRef = doc(db, 'beaches', region)
  //   await setDoc(doc(db, 'oceans', region), {})
  // }

  // for (const regon of regions) {
  //   let oceansRef = doc(db, 'oceans', region)
  //   await updateDoc(oceansRef, {
  //     [region]: {
  //   })
  // }

  // for (const region of regions) {
  //   const regionDoc = doc(db, 'beaches', region)

  //   await updateDoc(regionDoc, {
  //     region: {...allBeachArr}
  //   })
  // }
  // }

  return (
    <div>
      {/* <Hero /> */}
      <div className="container max-w-7xl mx-auto sm:w-9/12 lg:w-9/12"></div>
      <div className="h-56 sm:h-[400px] xl:h-[500px] 2xl:h-[600px]">
        <Carousel slideInterval={100000000}>
          <Banner />
          <img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-920344842-1-1567697513.jpg" />
          <img src="https://cdn.pixabay.com/photo/2018/06/13/18/20/waves-3473335_960_720.jpg" />
          <img src="https://images.unsplash.com/photo-1471922694854-ff1b63b20054?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fG9jZWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" />
          <img src="https://images.unsplash.com/photo-1553570739-330b8db8a925?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjl8fG9jZWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" />
          <img src="https://cdn.pixabay.com/photo/2017/03/27/14/49/beach-2179183_960_720.jpg" />
        </Carousel>
      </div>
    </div>
  )
}

export default Main
