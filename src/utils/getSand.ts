import axios from 'axios'

interface SandQuery {
  ServiceKey: string
  pageNo: number
  numOfRows: number
  SIDO_NM: string
  RES_YEAR: number
  resultType: string
}

const queryParams: SandQuery = {
  ServiceKey: import.meta.env.VITE_BEACH_API_KEY,
  pageNo: 1,
  numOfRows: 1000,
  SIDO_NM: '',
  RES_YEAR: 2017,
  resultType: 'json'
}

export const getSand = async (name: string): Promise<any> => {
  try {
    const { data } = await axios.get(
      'http://apis.data.go.kr/1192000/service/OceansBeachSandService1/getOceansBeachSandInfo1',
      {
        params: { ...queryParams, SIDO_NM: name }
      }
    )
    return data.getOceansBeachSandInfo
  } catch (error) {
    alert(error)
  }
}
