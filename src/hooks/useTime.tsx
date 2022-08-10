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

  const [year, setYear] = useState<string | number>(date.getFullYear())
  const [month, setMonth] = useState<string | number>(date.getMonth() + 1)
  const [day, setDay] = useState<string | number>(date.getDate())
  const [hours, setHours] = useState<string | number>(date.getHours())

  // 현재 시간에 따른 기상예보시간
  let nowForcastTime: string | number = 0
  let afterFiveHours: string | number =
    date.getHours() + 5 > 24 ? date.getHours() + 5 - 24 : date.getHours() + 5

  let minutes: string | number = date.getMinutes() < 10 ? '0' + afterFiveHours : afterFiveHours
  const forecastTime = ['02', '05', '08', '11', '14', '17', '20', '23']

  let today: number | string = year + '' + month + '' + day

  useEffect(() => {
    if (month < 10) {
      setMonth('0' + month)
    }
    if (hours < 10) {
      setHours('0' + hours)
    }
    if (day < 10) {
      setDay('0' + day)
    }
  }, [])

  today = year + '' + month + '' + day

  for (let i = 0; i < forecastTime.length; i++) {
    let h = Number(forecastTime[i]) - Number(hours)

    if (h === 0 || h === -1 || h === -2) {
      nowForcastTime = forecastTime[i]
    }
    if (hours == 0 || hours == 1) {
      today = Number(year + '' + month + day) - 1
      nowForcastTime = forecastTime[7]
    }
  }
  if (nowForcastTime < 10) {
    nowForcastTime = '0' + nowForcastTime
  }
  nowForcastTime = nowForcastTime + '00'

  return {
    today,
    nowForcastTime,
    hours,
    minutes,
    afterFiveHours
  }

  // 알아야할 것
  // return year: yyyy, month: dd, day: dd, hour: hhhh, minute: mm, afterFiveHopur: hhhh
}

export default useTime
