import * as actionTypes from './actionTypes'

export const showModal = id => {
  return { type: actionTypes.SHOW_MODAL, payload: id }
}

export const hideModal = () => {
  return { type: actionTypes.HIDE_MODAL }
}

export const changeNameAlbum = newAlbumTitle => {
  return { type: actionTypes.CHANGE_TITLE_ALBUM, payload: newAlbumTitle }
}

export const addToRemovableAlbumPhoto = albumPhoto => {
  return { type: actionTypes.ADD_ALBUM_PHOTO_TO_REMOVABLE, payload: albumPhoto }
}

export const deleteFromRemovableAlbumPhoto = albumPhoto => {
  return { type: actionTypes.DELETE_ALBUM_PHOTO_FROM_REMOVABLE, payload: albumPhoto }
}

export const removeAlbumPhoto = () => {
  return { type: actionTypes.REMOVE_ALBUM_PHOTO }
}

export const clearRemovalbeAlbumPhoto = () => {
  return { type: actionTypes.CLEAR_REMOVABLE_ALBUM_PHOTO }
}

export const addToRemovableAlbum = album => {
  return { type: actionTypes.ADD_ALBUM_TO_REMOVABLE, payload: album }
}

export const deleteFromRemovableAlbum = album => {
  return { type: actionTypes.DELETE_ALBUM_FROM_REMOVABLE, payload: album }
}

export const removeAlbum = () => {
  return { type: actionTypes.REMOVE_ALBUMS }
}

export const addNewAlbum = objNewAlbum => {
  return { type: actionTypes.ADD_NEW_ALBUM, payload: objNewAlbum }
}
