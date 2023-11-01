import React, { useContext } from 'react'
import { Trash2Icon } from 'lucide-react'
import { PhotoContext } from '../context/PhotoContext'

const ActionHeader: React.FC = () => {
  const { value, dispatch } = useContext(PhotoContext)
  const { selectedPhotos } = value

  const onDeletePhotos = () => {
    dispatch({ type: 'delete-photos', payload: { photoIds: selectedPhotos } })
  }

  const onCheckPhotos = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      dispatch({ type: 'check-all-photos' })
    } else {
      dispatch({ type: 'uncheck-all-photos' })
    }
  }

  return (
    <div className='border-b border-gray-300 py-3 mb-5 flex items-center justify-between'>
      <div className='flex gap-2 items-center'>
        <input
          type='checkbox'
          className='rounded-full'
          onChange={onCheckPhotos}
          checked={selectedPhotos.length > 0}
        />
        <p>
          {selectedPhotos.length > 0
            ? `${selectedPhotos.length} photos are selected`
            : 'Select all photos'}
        </p>
      </div>

      <button
        className='bg-red-500 text-white rounded-lg px-3 py-2 flex items-center gap-2'
        onClick={onDeletePhotos}
      >
        <Trash2Icon size={20} color='#ffffff' />
        <span className='font-medium'>Delete Photos</span>
      </button>
    </div>
  )
}

export default ActionHeader
