import React, { useContext } from 'react'
import { Trash2Icon } from 'lucide-react'
import { PhotoContext } from '../context/PhotoContext'
import { useSpring, animated } from '@react-spring/web'

const ActionHeader: React.FC = () => {
  const { value, dispatch } = useContext(PhotoContext)
  const { selectedPhotos } = value
  const springs = useSpring({
    scale: selectedPhotos.length > 0 ? 1 : 0.7,
    opacity: selectedPhotos.length > 0 ? 1 : 0
  })

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
    <div className='border-b h-[70px] border-gray-300 mb-5 flex items-center justify-between'>
      <div className='flex gap-2 items-center'>
        <input
          type='checkbox'
          className='rounded-full'
          onChange={onCheckPhotos}
          checked={selectedPhotos.length > 0}
        />
        <p>
          {selectedPhotos.length > 0
            ? `${selectedPhotos.length} photos selected`
            : 'Select all photos'}
        </p>
      </div>

      <animated.button
        style={springs}
        className='bg-red-600 text-white rounded-lg px-3 py-2 flex items-center gap-2'
        onClick={onDeletePhotos}
      >
        <Trash2Icon size={20} color='#ffffff' />
        <span className='text-sm md:text-base font-medium'>Delete Photos</span>
      </animated.button>
    </div>
  )
}

export default ActionHeader
