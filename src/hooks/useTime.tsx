import { stringify } from 'querystring'
import { useState, useEffect } from 'react'

interface UseTimeReturn {
  today: number | string
  nowForcastTime: string | number
  hours: string | number
  minutes: string | number
  afterFiveHours: string | number
}

const useTime: any = (): UseTimeReturn => {
  let date = new Date()

  let year = date.getFullYear()
  let month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  // const [day, setDay] = useState<string | number>(date.getDate())
  let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  const [hours, setHours] = useState<string | number>(date.getHours())

  // 현재 시간에 따른 기상예보시간
  let nowForcastTime: string | number = 0
  let afterFiveHours: string | number = date.getHours() + 5 > 24 ? date.getHours() - 19 : date.getHours() + 5

  let minutes: string | number = date.getMinutes() < 10 ? '0' + afterFiveHours : afterFiveHours
  const forecastTime = ['02', '05', '08', '11', '14', '17', '20', '23']

  let today: number | string = year + '' + month + '' + day

  // useEffect(() => {

  //   today = year + '' + month + '' + day
  // }, [])

  for (let i = 0; i < forecastTime.length; i++) {
    let h = Number(forecastTime[i]) - Number(hours)

    if (h === 0 || h === -1 || h === -2) {
      nowForcastTime = Number(forecastTime[i])
    }
    if (hours == 0 || hours == 1) {
      today = Number(year + '' + month + '' + day) - 1
      nowForcastTime = Number(forecastTime[7])
    }
  }
  if (nowForcastTime < 10) {
    nowForcastTime = nowForcastTime + '00'
  } else if (nowForcastTime >= 10) {
    nowForcastTime = nowForcastTime + '00'
  }

  console.log(day)
  console.log('today', today)
  return {
    today,
    nowForcastTime,
    hours,
    minutes,
    afterFiveHours
  }
}

export default useTime
