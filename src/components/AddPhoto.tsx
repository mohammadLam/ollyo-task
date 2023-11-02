import { FileImage } from 'lucide-react'
import React, { useContext, useRef } from 'react'
import PhotoI from '../interface/photos'
import { PhotoContext } from '../context/PhotoContext'

const AddPhoto = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { dispatch, value } = useContext(PhotoContext)
  const { photos } = value
  const onFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newPhotos: PhotoI[] = []
      Array.from(event.target.files).forEach((photo, index) => {
        photos.push({
          id: photos.length + (index + 1),
          image: URL.createObjectURL(photo)
        })
      })
      dispatch({ type: 'add-photos', payload: { photos: newPhotos } })
    }
  }

  return (
    <div
      className='2xl:w-[200px] 2xl:h-[200px] w-[150px] h-[150px] rounded-xl border-2 border-gray flex flex-col items-center justify-center gap-2'
      onClick={() => {
        if (inputRef.current) inputRef.current.click()
      }}
    >
      <FileImage size={40} strokeWidth={1} />
      <input multiple type='file' hidden ref={inputRef} onChange={onFileUpload} />
      <p>Add Photos</p>
    </div>
  )
}

export default AddPhoto
