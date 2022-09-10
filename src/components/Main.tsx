import { Carousel } from 'flowbite-react'
import Hero from '~/components/Banner'
import Banner from '~/components/Banner'
import { useSelector } from 'react-redux'
import { useUserSelector } from '~/store/store'
import { db } from '~/firebase/fbase'
import { getBeach } from '~/utils/getBeach'
import { addDoc, collection, doc, getDoc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore'
import useGetAllBeach from '~/hooks/useGetAllBeach'
import { getWeather } from '~/utils/getWeather'
import RecommendBeach from './RecommendBeach'

const Main = () => {
  return (
    <div>
      {/* <Hero /> */}
      <div className="container max-w-7xl mx-auto sm:w-9/12 lg:w-9/12"></div>
      <div className="h-56 xs:h-[320px]  sm:h-[370px] xl:h-[420px]">
        <Carousel slideInterval={100000000}>
          <Banner />
          <img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-920344842-1-1567697513.jpg" />
        </Carousel>
      </div>
      <div>
        <div className="flex flex-col justify-center items-center text-2xl">
          <div className="my-10">
            <span className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-sky-600 ">
              좋아요 Top 10 해수욕장!
            </span>
          </div>
          <RecommendBeach />
        </div>
      </div>
    </div>
  )
}

export default Main
