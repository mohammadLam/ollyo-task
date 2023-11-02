import React, { useContext } from 'react'
import { useTransition } from '@react-spring/web'
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core'
import { SortableContext, arrayMove, rectSortingStrategy } from '@dnd-kit/sortable'
import Photo from './Photo'
import AddPhoto from './AddPhoto'
import { PhotoContext } from '../context/PhotoContext'

const Grid: React.FC = () => {
  const { value, dispatch } = useContext(PhotoContext)
  const { photos } = value
  const transitions = useTransition(photos, {
    from: { scale: 0.8 },
    enter: { scale: 1 },
    leave: { scale: 0 },
    config: {
      duration: 300
    }
  })

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over) {
      if (active.id !== over.id) {
        const oldIndex = photos.findIndex(photo => photo.id === active.id)
        const newIndex = photos.findIndex(photo => photo.id === over.id)

        const sortedPhotos = arrayMove(photos, oldIndex, newIndex)

        dispatch({ type: 'sort-photos', payload: { photos: sortedPhotos } })
      }
    }
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={photos} strategy={rectSortingStrategy}>
        <div className='grid grid-cols-[150px_150px] md:grid-cols-[150px_150px_150px] lg:grid-cols-[150px_150px_150px_150px] 2xl:grid-cols-[200px_200px_200px_200px] gap-4'>
          {transitions((style, photo, _, index) => (
            <Photo key={photo.id} style={style} {...photo} isFeatured={index === 0} />
          ))}
          <AddPhoto />
        </div>
      </SortableContext>
    </DndContext>
  )
}

export default Grid
