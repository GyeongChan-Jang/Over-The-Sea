import React from 'react'
import { Card } from 'flowbite-react'

const MapOverlay = ({ setIsOpen, location }: any) => {
  return (
    <div className="max-w-sm -m-2">
      <Card
        imgAlt="Meaningful alt text for an image that is not purely decorative"
        imgSrc="https://www.gtdc.or.kr/dzSmart/upfiles/Tours/2018August/34/0cbd16f8edf5e3e1ec23f1da43b791de_1534734408.jpg"
      >
        {/* <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Noteworthy technology acquisitions 2021
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse
          chronological order.
        </p> */}
        <div>{location.sta_nm}</div>
        <button onClick={() => setIsOpen(false)}>X</button>
      </Card>
    </div>
  )
}

export default MapOverlay
