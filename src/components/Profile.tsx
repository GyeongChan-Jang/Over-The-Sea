import React, { useRef, useState } from 'react'
import { useAppDispatch, useUserSelector } from '~/store/store'
// import { updateUserProfileImage } from '~/store/userSlice'

const Profile = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>('')
  const dispatch = useAppDispatch()
  const imagePicker = useRef<HTMLInputElement>(null)

  const { userData } = useUserSelector((state) => state.user)

  const imageSelector = () => {
    imagePicker.current?.click()
  }

  const changeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      let changeImage = ''
      const reader = new FileReader()
      reader.onload = (e: ProgressEvent) => {
        const dataUrl = (e.target as FileReader).result as string
        changeImage = dataUrl
        console.log(changeImage)
      }
      reader.readAsDataURL(file)
      console.log(selectedImage)
      // dispatch(
      //   updateUserProfileImage({
      //     uid: userData.uid,
      //     userImage: changeImage
      //   })
      // )
    }
  }

  return (
    <div>
      <div className="font-jalnanche h-screen w-full flex flex-row justify-center items-center">
        <div className="card w-96 mx-auto bg-white  shadow-xl rounded-lg">
          <div className="flex justify-center mb-4">
            <img
              className="w-32 mx-auto rounded-full -mt-20 ring-8 ring-gray-100"
              src={
                userData.userImage ? userData.userImage : 'https://source.boringavatars.com/beam'
              }
              alt=""
            />
          </div>
          <div className="text-center mt-2 text-3xl font-medium">{userData.name}</div>
          <div className="text-center mt-2 font-light text-sm">{userData.email}</div>

          <hr className="mt-8" />
          <div className="flex p-4">
            <div className="w-1/2 text-center">
              <button
                className="hover:text-blue-800 hover:scale-110 ease-in duration-200"
                onClick={imageSelector}
              >
                <input ref={imagePicker} type="file" hidden onChange={changeImageHandler} />
                프로필 사진 변경
              </button>
            </div>
            <div className="w-0 border border-gray-300"></div>
            <div className="w-1/2 text-center">
              <button className="font-bold hover:text-blue-800 hover:scale-110 ease-in duration-200">
                이름 변경
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
