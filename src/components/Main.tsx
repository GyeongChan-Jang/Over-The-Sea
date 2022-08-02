import React from 'react'
import { Carousel } from 'flowbite-react'
import Hero from '~/components/Hero'

const Main = () => {
  return (
    <div>
      {/* <Hero /> */}
      <div className="container max-w-7xl mx-auto sm:w-9/12 lg:w-9/12">
        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
          <Carousel slideInterval={100000000}>
            <img
              src="https://cdn.pixabay.com/photo/2017/12/15/13/51/polynesia-3021072_960_720.jpg"
              className="w-full"
            />
            <img
              src="https://cdn.pixabay.com/photo/2018/06/13/18/20/waves-3473335_960_720.jpg"
              className="w-full h-full"
            />
            <img src="https://images.unsplash.com/photo-1471922694854-ff1b63b20054?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fG9jZWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" />
            <img src="https://images.unsplash.com/photo-1553570739-330b8db8a925?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjl8fG9jZWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" />
            <img src="https://cdn.pixabay.com/photo/2017/03/27/14/49/beach-2179183_960_720.jpg" />
          </Carousel>
        </div>
      </div>
    </div>
  )
}

export default Main
