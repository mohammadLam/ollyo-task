import { FileImage } from 'lucide-react'
import React, { useRef } from 'react'

const AddPhoto: React.FC<{
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void
}> = ({ onFileUpload }) => {
  const inputRef = useRef<HTMLInputElement>(null)
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
