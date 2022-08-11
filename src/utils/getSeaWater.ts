import axios from 'axios'

const regions = ['부산', '인천', '울산', '강원', '충남', '전북', '전남', '경북', '경남', '제주']

interface SeaWaterQuery {
  ServiceKey: string
  pageNo: number
  numOfRows: number
  SIDO_NM: string
  resultType: string
  RES_YEAR: string
}

const queryParams: SeaWaterQuery = {
  ServiceKey: import.meta.env.VITE_BEACH_API_KEY,
  pageNo: 1,
  numOfRows: 1000,
  SIDO_NM: '부산',
  resultType: 'json',
  RES_YEAR: '2018'
}

export const getSeaWater = async (name: string): Promise<any> => {
  try {
    const response = await axios.get(
      'http://apis.data.go.kr/1192000/service/OceansBeachSeawaterService1/getOceansBeachSeawaterInfo1',
      {
        params: { ...queryParams, SIDO_NM: name }
      }
    )
    return response.data.getOceansBeachSeawaterInfo
  } catch (error) {
    alert(error)
  }
}