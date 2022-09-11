import axios from 'axios'

interface SeaWaterQuery {
  ServiceKey: string
  pageNo: number
  numOfRows: number
  SIDO_NM: string
  resultType: string
  RES_YEAR: string
}

const queryParams: SeaWaterQuery = {
  // ServiceKey: import.meta.env.VITE_BEACH_API_KEY,
  ServiceKey: 'YKhkbWsCsaTywu2QHRS70v5QGa6XB6aK/BVsqughtWFRU2Q00gi6uJ4WiXK6oirbBZmFThW4heHbnOa9XJpWZA==',
  pageNo: 1,
  numOfRows: 1000,
  SIDO_NM: '부산',
  resultType: 'json',
  RES_YEAR: '2018'
}

export const getSeaWater = async (name: string): Promise<any> => {
  try {
    const response = await axios.get('/api/1192000/service/OceansBeachSeawaterService1/getOceansBeachSeawaterInfo1', {
      params: { ...queryParams, SIDO_NM: name }
    })
    return response.data.getOceansBeachSeawaterInfo
  } catch (error) {
    alert(error)
  }
}
