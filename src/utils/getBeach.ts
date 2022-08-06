import axios from 'axios'

interface RequestQuery {
  ServiceKey: string
  pageNo: number
  numOfRows: number
  SIDO_NM: string
  resultType: string
}

const queryParams: RequestQuery = {
  ServiceKey: import.meta.env.REACT_APP_SERVICE_KEY,
  pageNo: 1,
  numOfRows: 10,
  SIDO_NM: '서울특별시',
  resultType: 'json'
}

export const getBeach = async (): Promise<any> => {
  const { data } = await axios.get(import.meta.env.REACT_APP_SERVICE_URL, {
    params: queryParams
  })
  return data
}
