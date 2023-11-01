import React, { useContext } from 'react'
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core'
import { SortableContext, arraySwap, rectSwappingStrategy } from '@dnd-kit/sortable'
import PhotoI from '../interface/photos'
import Photo from './Photo'
import AddPhoto from './AddPhoto'
import { PhotoContext } from '../context/PhotoContext'

const Grid: React.FC = () => {
  const {
    value: { photos },
    dispatch
  } = useContext(PhotoContext)

  const onFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const photos: PhotoI[] = []
      Array.from(event.target.files).forEach((photo, index) => {
        photos.push({
          id: photos.length + (index + 1),
          image: URL.createObjectURL(photo)
        })
      })
      dispatch({ type: 'add-photos', payload: { photos } })
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over) {
      if (active.id !== over.id) {
        const oldIndex = photos.findIndex(photo => photo.id === active.id)
        const newIndex = photos.findIndex(photo => photo.id === over.id)

        const sortedPhotos = arraySwap(photos, oldIndex, newIndex)

        dispatch({ type: 'sort-photos', payload: { photos: sortedPhotos } })
      }
    }
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={photos} strategy={rectSwappingStrategy}>
        <div className='grid grid-cols-[150px_150px] md:grid-cols-[150px_150px_150px] lg:grid-cols-[150px_150px_150px_150px] 2xl:grid-cols-[200px_200px_200px_200px] gap-4'>
          {photos.map((photo, index) => (
            <Photo key={photo.id} {...photo} isFeatured={index === 0} />
          ))}
          <AddPhoto onFileUpload={onFileUpload} />
        </div>
      </SortableContext>
    </DndContext>
  )
}

export default Grid
