import clsx from 'clsx'
import { CSS } from '@dnd-kit/utilities'
import React, { useContext } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import PhotoI from '../interface/photos'
import { PhotoContext } from '../context/PhotoContext'

const Photo: React.FC<PhotoI> = ({ isFeatured = false, id, image }) => {
  const { value, dispatch } = useContext(PhotoContext)
  const { selectedPhotos } = value
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id
  })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  const onPhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      dispatch({ type: 'check-single-photo', payload: { photoId: id } })
    } else {
      dispatch({ type: 'uncheck-single-photo', payload: { photoId: id } })
    }
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={clsx(
        'relative 2xl:w-[200px] 2xl:h-[200px] w-[150px] h-[150px] rounded-xl bg-white overflow-hidden border bg-blend-darken',
        {
          '2xl:!w-[416px] 2xl:!h-[416px] w-[316px] h-[316px] row-span-2 col-span-2': isFeatured
        }
      )}
    >
      <img src={image} alt={`Photo Id ${id}`} className='w-full h-full object-cover' />
      <input
        type='checkbox'
        className='z-10 absolute top-4 right-4 rounded-full'
        checked={selectedPhotos.includes(id)}
        onPointerDown={event => event.stopPropagation()}
        onChange={onPhotoChange}
      />
    </div>
  )
}

export default Photo
