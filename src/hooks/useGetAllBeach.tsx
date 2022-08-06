import { useEffect, useState } from 'react'
import axios from 'axios'

import React from 'react'

const useGetAllBeach = () => {
  const [beachList, setBeachList] = useState([])

  useEffect(() => {}, [])

  return beachList
}

export default useGetAllBeach
