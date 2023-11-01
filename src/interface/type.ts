import PhotoI from './photos'

interface AddPhotoI {
  type: 'add-photos'
  payload: {
    photos: PhotoI[]
  }
}

interface DeletePhotoI {
  type: 'delete-photos'
  payload: {
    photoIds: number[]
  }
}

interface SortPhotoI {
  type: 'sort-photos'
  payload: {
    photos: PhotoI[]
  }
}

interface CheckAllPhotoI {
  type: 'check-all-photos'
}

interface UncheckAllPhotoI {
  type: 'uncheck-all-photos'
}

interface CheckSinglePhotoI {
  type: 'check-single-photo'
  payload: {
    photoId: number
  }
}

interface UncheckSinglePhotoI {
  type: 'uncheck-single-photo'
  payload: {
    photoId: number
  }
}

type ACTION_TYPE =
  | AddPhotoI
  | DeletePhotoI
  | SortPhotoI
  | CheckAllPhotoI
  | UncheckAllPhotoI
  | CheckSinglePhotoI
  | UncheckSinglePhotoI

export default ACTION_TYPE
