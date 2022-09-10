import React, { useRef, useState } from 'react'
import { useAppDispatch, useUserSelector } from '~/store/store'
import { updateUserProfileImage, updateUserProfileName } from '~/store/userSlice'
// import { updateUserProfileImage } from '~/store/userSlice'

const Profile = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>('')
  const [userName, setUserName] = useState<string>('')
  const [nameUpdateMode, setNameUpdateMode] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const imagePicker = useRef<HTMLInputElement>(null)
  const changeRef = useRef<HTMLInputElement>(null)

  const { userData } = useUserSelector((state) => state.user)

  const imageSelector = () => {
    imagePicker.current?.click()
  }

  const changeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const currentFile = e.target.files[0]
      let changeImage: string = ''
      let reader = new FileReader()
      reader.onload = (e: ProgressEvent) => {
        changeImage = (e.target as FileReader).result as string
        setSelectedImage(changeImage)
      }
      reader.readAsDataURL(currentFile)
    }
  }

  const onChangeImage = () => {
    if (!selectedImage) return

    dispatch(
      updateUserProfileImage({
        uid: userData.uid,
        userImage: selectedImage!
      })
    )
    setSelectedImage(null)
  }

  const onChangeName = (changeName: string) => {
    dispatch(updateUserProfileName({ uid: userData.uid, userName: changeName }))
    setNameUpdateMode(false)
  }
  console.log(changeRef.current?.value)

  return (
    <div>
      <div className="font-jalnanche h-screen w-full flex flex-row justify-center items-center ">
        <div className="card w-96 mx-auto bg-white  shadow-xl rounded-lg">
          <div className="flex justify-center mb-4">
            <img
              className="w-32 mx-auto rounded-full -mt-20 ring-8 ring-gray-100"
              src={userData.userImage ? userData.userImage : 'https://source.boringavatars.com/beam'}
              alt=""
            />
          </div>
          {nameUpdateMode ? (
            <div className="flex justify-center">
              <input className="text-center mt-2 text-2xl font-medium" ref={changeRef} />
            </div>
          ) : (
            <div className="text-center mt-2 text-3xl font-medium">{userData.name}</div>
          )}
          <div className="text-center mt-2 font-light text-sm">{userData.email}</div>

          <hr className="mt-8" />
          <div className="flex p-4">
            <div className="w-1/2 text-center">
              {!selectedImage ? (
                <button className="hover:text-blue-800 hover:scale-110 ease-in duration-200" onClick={imageSelector}>
                  <input ref={imagePicker} type="file" hidden onChange={changeImageHandler} />
                  프로필 사진 변경
                </button>
              ) : (
                <button className="hover:text-blue-800 hover:scale-110 ease-in duration-200" onClick={onChangeImage}>
                  변경 완료
                </button>
              )}
            </div>
            <div className="w-0 border border-gray-300"></div>
            <div className="w-1/2 text-center">
              {!nameUpdateMode ? (
                <button
                  className="font-bold hover:text-blue-800 hover:scale-110 ease-in duration-200"
                  onClick={() => setNameUpdateMode(!nameUpdateMode)}
                >
                  이름 변경
                </button>
              ) : (
                <button
                  className="font-bold hover:text-blue-800 hover:scale-110 ease-in duration-200"
                  onClick={() => onChangeName(changeRef.current?.value as string)}
                >
                  변경 완료
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
