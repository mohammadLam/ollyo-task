import React, { createContext, useReducer } from 'react'
import PhotoI from '../interface/photos'
import ACTION_TYPE from '../interface/type'

interface ContextValue {
  photos: PhotoI[]
  selectedPhotos: number[]
}

const defaultValue: ContextValue = {
  photos: [
    {
      id: 1,
      image: '/images/image-1.webp'
    },
    {
      id: 2,
      image: '/images/image-2.webp'
    },
    {
      id: 3,
      image: '/images/image-3.webp'
    },
    {
      id: 4,
      image: '/images/image-4.webp'
    },
    {
      id: 5,
      image: '/images/image-5.webp'
    },
    {
      id: 6,
      image: '/images/image-6.webp'
    },
    {
      id: 7,
      image: '/images/image-7.webp'
    },
    {
      id: 8,
      image: '/images/image-8.webp'
    },
    {
      id: 9,
      image: '/images/image-9.webp'
    },
    {
      id: 10,
      image: '/images/image-10.jpeg'
    },
    {
      id: 11,
      image: '/images/image-11.jpeg'
    }
  ],
  selectedPhotos: []
}

interface ContextI {
  value: ContextValue
  dispatch: React.Dispatch<ACTION_TYPE>
}
export const PhotoContext = createContext<ContextI>(null!)

const reducer = (state: ContextValue, action: ACTION_TYPE): ContextValue => {
  const { photos, selectedPhotos } = state
  switch (action.type) {
    case 'add-photos': {
      const newPhotos = photos.concat(action.payload.photos)
      return { ...state, photos: newPhotos }
    }
    case 'delete-photos': {
      // remove those photos who have include on selectedPhotos
      const photosAfterDelete = photos.filter(photo => !action.payload.photoIds.includes(photo.id))
      // delete photoIds from selectedPhotos
      const selectedPhotosAfterDelete = selectedPhotos.filter(
        photoId => !action.payload.photoIds.includes(photoId)
      )
      return { ...state, photos: photosAfterDelete, selectedPhotos: selectedPhotosAfterDelete }
    }
    case 'sort-photos': {
      const sortedPhotos = action.payload.photos
      return { ...state, photos: sortedPhotos }
    }
    case 'check-all-photos': {
      const allSelectedPhotos = photos.map(photo => photo.id)
      return { ...state, selectedPhotos: allSelectedPhotos }
    }
    case 'uncheck-all-photos': {
      return { ...state, selectedPhotos: [] }
    }
    case 'check-single-photo': {
      if (selectedPhotos.includes(action.payload.photoId) === false) {
        const newSelectedPhotos = [...state.selectedPhotos, action.payload.photoId]
        return { ...state, selectedPhotos: newSelectedPhotos }
      }
      return state
    }
    case 'uncheck-single-photo': {
      if (selectedPhotos.includes(action.payload.photoId)) {
        const newSelectedPhotos = selectedPhotos.filter(
          photoId => photoId !== action.payload.photoId
        )
        return { ...state, selectedPhotos: newSelectedPhotos }
      }
      return state
    }
    default:
      return state
  }
}

interface PhotoProviderPropsI {
  children?: React.ReactNode
}

const PhotoProvider: React.FC<PhotoProviderPropsI> = ({ children }) => {
  const [value, dispatch] = useReducer(reducer, defaultValue)

  return <PhotoContext.Provider value={{ value, dispatch }}>{children}</PhotoContext.Provider>
}

export default PhotoProvider
