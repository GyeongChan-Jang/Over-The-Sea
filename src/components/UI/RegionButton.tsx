import React from 'react'
import { Button } from 'flowbite-react'
import ToggleButton from './ToggleButton'
import { regions } from '~/constants/regions.json'

const RegionButton = ({ region, regionClickHandler }: any) => {
  return (
    <div>
      <div className="title flex justify-between ">
        <span className="mt-2 text-blue-900 text-xl">
          {region && (
            <>
              {' '}
              <span> '{region}'</span>
              <span className="text-lg text-[#333]"> 의 날씨!</span>
            </>
          )}
        </span>
        <div className="flex gap-2">
          <span className="mt-2 text-[#333]">내 위치</span>
          <ToggleButton />
        </div>
      </div>
      <div className="divide h-[2px] bg-[#333] my-4" />
      <div className="my-4 flex flex-wrap justify-center gap-4 rounded-md shadow-xl p-4 bg-white">
        {regions.map((region: any) => (
          <Button key={region} color="dark" pill={true} name={region} onClick={regionClickHandler}>
            {region}
          </Button>
        ))}
      </div>
    </div>
  )
}

export default RegionButton
