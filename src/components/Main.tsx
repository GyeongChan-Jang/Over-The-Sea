import React from 'react'
import { Carousel } from 'flowbite-react'
import Hero from '~/components/Banner'
import Banner from '~/components/Banner'
import { useSelector } from 'react-redux'
import { useUserSelector } from '~/store/store'

const Main = () => {
  const { userData } = useUserSelector((state) => state.user)
  console.log(userData)
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
