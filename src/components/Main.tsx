import React from 'react'
import { Carousel } from 'flowbite-react'

const Main = () => {
  return (
    <div>
      <div className="container max-w-7xl mx-auto sm:w-9/12 lg:w-9/12">
        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
          <Carousel slideInterval={100000000}>
            <img src="https://images.unsplash.com/photo-1488188840666-e2308741a62f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8b2NlYW58ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60" />
            <img
              src="https://images.unsplash.com/photo-1488278905738-514111aa236c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fG9jZWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
              alt="..."
            />
            <img
              src="https://images.unsplash.com/photo-1471922694854-ff1b63b20054?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fG9jZWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
              alt="..."
            />
            <img
              src="https://images.unsplash.com/photo-1553570739-330b8db8a925?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjl8fG9jZWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
              alt="..."
            />
            <img
              src="https://images.unsplash.com/photo-1551244072-5d12893278ab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODV8fG9jZWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
              alt="..."
            />
          </Carousel>
        </div>
      </div>
    </div>
  )
}

export default Main
