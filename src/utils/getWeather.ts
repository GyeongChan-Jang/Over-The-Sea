import axios from 'axios'

interface WeatherQuery {
  serviceKey: string
  pageNo: number
  numOfRows: number
  dataType: string
  base_date: string
  base_time: string
  nx: number
  ny: number
}

// const regions = ['부산', '인천', '울산', '강원', '충남', '전북', '전남', '경북', '경남', '제주']

const queryParams: WeatherQuery = {
  serviceKey: import.meta.env.VITE_WEATHER_API_KEY,
  pageNo: 1,
  numOfRows: 100,
  dataType: 'JSON',
  base_date: '20220808',
  base_time: '1400',
  nx: 55,
  ny: 127
}

export const getWeather = async (x: number, y: number) => {
  try {
    const response = await axios.get(
      'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst',
      {
        params: { ...queryParams, nx: x, ny: y }
      }
    )
    return response.data.response.body.items.item
  } catch (e) {
    console.log(e)
  }
}
