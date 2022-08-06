import axios from 'axios'

interface RequestQuery {
  ServiceKey: string
  pageNo: number
  numOfRows: number
  SIDO_NM: string
  resultType: string
}

// const regions = ['부산', '인천', '울산', '강원', '충남', '전북', '전남', '경북', '경남', '제주']

const queryParams: RequestQuery = {
  ServiceKey: import.meta.env.VITE_BEACH_API_KEY,
  pageNo: 1,
  numOfRows: 100,
  SIDO_NM: '',
  resultType: 'json'
}

export const getBeach = async (name: string): Promise<any> => {
  try {
    const { data } = await axios.get(
      '/api/1192000/service/OceansBeachInfoService1/getOceansBeachInfo1',
      {
        params: { ...queryParams, SIDO_NM: name }
      }
    )
    // console.log(data.getOceansBeachInfo.item)
    return data.getOceansBeachInfo.item
  } catch (error) {
    alert(error)
  }
}
