import { updateCurrentUser } from 'firebase/auth'
import { addDoc, collection, doc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import React, { useRef, useState } from 'react'
import { MdOutlineAddAPhoto } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { db, storage } from '~/firebase/fbase'

const BeachPost = ({ params, setPostId }: any) => {
  const [post, setPost] = useState<string>()
  const [postImage, setPostImage] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const imagePickRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const { userData } = useSelector((state: any) => state.user)

  const postInputHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target
    setPost(value)
  }

  const imagePickHandler = () => {
    imagePickRef.current?.click()
  }

  const deletePostImageHandler = () => {
    setPostImage('')
  }

  const imageUploadHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target
    if (files) {
      const file = files[0]
      let fileUrl: string = ''
      const fileReader = new FileReader()
      fileReader.onload = () => {
        fileUrl = fileReader.result as string
        setPostImage(() => fileUrl)
      }
      fileReader.readAsDataURL(file)
    }
  }

  const postSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!userData.uid) {
      alert('로그인이 필요합니다.')
      navigate('/auth')
      return
    }
    e.preventDefault()
    try {
      setIsLoading(true)
      const docRef = await addDoc(collection(db, 'beaches', params.id, 'posts'), {
        uid: userData.uid,
        content: post,
        pid: '',
        postImage: null,
        beachId: params.id,
        time: serverTimestamp(),
        likse: 0,
        userImage: userData.userImage,
        userName: userData.name
      })
      // 만든 게시물의 pid 저장
      await updateDoc(doc(db, 'beaches', params.id, 'posts', docRef.id), {
        pid: docRef.id
      })
      console.log(docRef)

      if (postImage) {
        const imageRef = ref(storage, `beaches/${docRef.id}/image`)
        uploadString(imageRef, postImage, 'data_url').then(async (snapshot) => {
          console.log(snapshot.ref)
          const downloadURL = await getDownloadURL(snapshot.ref)
          await updateDoc(doc(db, 'beaches', params.id, 'posts', docRef.id), {
            postImage: downloadURL
          })
        })
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
      setPost('')
      setPostImage('')
    }
  }

  return (
    <div>
      <div className="flex mx-auto items-center justify-center mb-10 w-[90%]">
        <form
          onSubmit={postSubmitHandler}
          className="w-[90%] bg-white rounded-xl px-4 pt-2 shadow-xl"
        >
          <div className="flex flex-wrap -mx-3 mb-6">
            <h2 className="px-4 pt-3 pb-2 text-gray-800 text-sm">
              <span className="text-blue-900 ">해수욕장</span> 후기를 남겨주세요!
            </h2>
            <div className="w-full md:w-full px-3 mb-2 mt-2 text-center">
              <textarea
                className=" bg-gray-100 rounded xlrder border-gray-400 leading-normal resize-none w-[90%] h-20 py-2 px-3 font-medium placeholder-gray-400 focus:outline-none focus:bg-white font-nexonRegular"
                name="body"
                placeholder="소중한 후기"
                required
                onChange={postInputHandler}
                value={post}
              ></textarea>
            </div>
            <div className=" md:w-full flex justify-end px-7 w-[100%] h-[50px]">
              <div className="-mr-1 flex gap-6 mt-2">
                {postImage && (
                  <img
                    width={46}
                    height={46}
                    src={postImage}
                    onClick={deletePostImageHandler}
                    className="cursor-pointer hover:grayscale "
                  />
                )}
                <button type="button" className="ring ring-gray-300 rounded hover:bg-gray-100">
                  <MdOutlineAddAPhoto onClick={imagePickHandler} className="w-8 h-8" />
                </button>
                <input
                  ref={imagePickRef}
                  className="hidden rounded-lg w-24"
                  type="file"
                  onChange={imageUploadHandler}
                />

                <input
                  type="submit"
                  className="border-none bg-white text-gray-600 py-2 px-4 ring ring-gray-300 rounded-xl tracking-wide mr-1 hover:bg-gray-100 cursor-pointer font-nexonRegular font-bold"
                  value="완료"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default BeachPost
