import axios from 'axios'

interface BeachQuery {
  ServiceKey: string
  pageNo: number
  numOfRows: number
  SIDO_NM: string
  resultType: string
}

const queryParams: BeachQuery = {
  ServiceKey: import.meta.env.VITE_BEACH_API_KEY,
  pageNo: 1,
  numOfRows: 500,
  SIDO_NM: '',
  resultType: 'json'
}

export const getBeach = async (name: string): Promise<any> => {
  try {
    const { data } = await axios.get(
      'http://apis.data.go.kr/1192000/service/OceansBeachInfoService1/getOceansBeachInfo1',
      {
        params: { ...queryParams, SIDO_NM: name }
      }
    )
    return data.getOceansBeachInfo.item
  } catch (error) {
    alert(error)
  }
}
