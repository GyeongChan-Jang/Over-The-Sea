import React from 'react'
import { Spinner } from 'flowbite-react'

const Loading = () => {
  return (
    <div className="flex flex-wrap gap-2">
      <Spinner color="info" aria-label="center-aligned Info spinner example" size="xl" />
    </div>
  )
}

export default Loading
