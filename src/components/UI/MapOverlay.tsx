import React from 'react'
import { Card, Tabs } from 'flowbite-react'

const MapOverlay = ({ setIsOpen, location }: any) => {
  return (
    <div className="overlaybox">
      <div className="max-w-xs -m-2">
        <Card
          imgAlt="Meaningful alt text for an image that is not purely decorative"
          imgSrc="https://www.gtdc.or.kr/dzSmart/upfiles/Tours/2018August/34/0cbd16f8edf5e3e1ec23f1da43b791de_1534734408.jpg"
        >
          <div className="flex flex-col items-center gap-2">
            <p className="text-center text-blue-700 text-lg align-middle">
              <span className="mr-2">
                <img src="../../../public/assets/images/beach-ball.png" width={24} height={24} />
              </span>
              <span className="align-top">{location.sta_nm} 해수욕장</span>
              <span className="ml-2">
                <img src="../../../public/assets/images/beach-ball.png" width={24} height={24} />
              </span>
            </p>
            <p className="text-neutral-600">
              {location.sido_nm} {location.gugun_nm}{' '}
            </p>
            <div className="w-full pt-1 ">
              <Tabs.Group aria-label="Full width tabs" style="fullWidth">
                <Tabs.Item title="날 씨 ☀️">기상정보</Tabs.Item>
                <Tabs.Item title="수 질 🌊">수질정보</Tabs.Item>
                <Tabs.Item title="백 사 장 🏖️">백사장정보</Tabs.Item>
              </Tabs.Group>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)}>X</button>
        </Card>
      </div>
    </div>
  )
}

export default MapOverlay
