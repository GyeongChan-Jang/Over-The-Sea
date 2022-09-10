import React, { useState, useEffect, useRef } from 'react'

// const Hero = () => {
//   return (
//     <div>
//       <div className='bg-[url("https://cdn.pixabay.com/photo/2017/01/20/00/30/maldives-1993704_960_720.jpg")] h-96 w-full bg-cover'>
//         <h1>바다로 떠나자!!</h1>
//         <h2>해수욕장의 유용한 정보를 제공합니다.</h2>
//       </div>
//     </div>
//   )
// }

// export default Hero
const contentText = '바다로 떠나자!!      \n 안전한 바다 여행은, 바다 갈땐?!         \n 바다어때. '
const Banner = () => {
  const textRef = useRef<any>(null)
  let i = 0
  let timer: any
  const [blinkOut, setBlinkOut] = useState(false)
  useEffect(() => {
    timer = () => {
      let txt = contentText[i]
      textRef.current.innerHTML += txt === '\n' ? '<br/>' : txt
      i++
      if (i < contentText.length) {
        setTimeout(timer, 150)
      } else {
        setBlinkOut(true)
      }
    }
    setTimeout(timer, 150)
    return () => clearInterval(timer)
  }, [])
  return (
    <>
      <div className="xs:text:lg xs:leading-[30px] sm:text-2xl sm:leading-[50px] md:text-4xl md:leading-[60px] lg:text-5xl lg:leading-[80px] w-[90%] mx-auto h-64 max-h-64  bg-gradient-to-r from-sky-500 to-blue-800 text-white p-4 mt-12 font-bold leading-[80px] rounded-lg">
        <span ref={textRef}></span>
        {!blinkOut && (
          <span className="xs:text:lg sm:text-xl md:text-4xl lg:text-5xl inline-block align-baseline animate-blink ">
            |
          </span>
        )}
      </div>
    </>
  )
}
export default Banner
