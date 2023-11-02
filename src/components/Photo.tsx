import clsx from 'clsx'
import { CSS } from '@dnd-kit/utilities'
import React, { useContext } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { Lookup, SpringValues, animated } from '@react-spring/web'
import PhotoI from '../interface/photos'
import { PhotoContext } from '../context/PhotoContext'

interface PropsI extends PhotoI {
  style?: SpringValues<Lookup<number>>
}

const Photo: React.FC<PropsI> = ({ isFeatured = false, id, image, style }) => {
  const { value, dispatch } = useContext(PhotoContext)
  const { selectedPhotos } = value

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id
  })
  const sortableStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    ...style
  }

  const onPhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      dispatch({ type: 'check-single-photo', payload: { photoId: id } })
    } else {
      dispatch({ type: 'uncheck-single-photo', payload: { photoId: id } })
    }
  }

  return (
    <animated.div
      ref={setNodeRef}
      style={sortableStyle}
      {...attributes}
      {...listeners}
      className={clsx(
        'relative 2xl:w-[200px] 2xl:h-[200px] w-[150px] h-[150px] rounded-xl overflow-hidden border bg-white origin-[50%_50%] cursor-grab group',
        {
          '2xl:!w-[416px] 2xl:!h-[416px] w-[316px] h-[316px] row-span-2 col-span-2': isFeatured
        },
        {
          'cursor-grabbing': isDragging
        }
      )}
    >
      <div className='w-full h-full transition duration-300 group-hover:bg-black/10 absolute'></div>
      <img src={image} alt={`Photo Id ${id}`} className='w-full h-full object-cover' />
      <input
        type='checkbox'
        className='z-10 w-5 h-5 absolute top-4 right-4 rounded-full'
        checked={selectedPhotos.includes(id)}
        onPointerDown={event => event.stopPropagation()}
        onChange={onPhotoChange}
      />
    </animated.div>
  )
}

export default Photo
