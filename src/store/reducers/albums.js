import * as actionTypes from '../actions/actionTypes'
import _ from 'lodash'
import { instanceAlbums } from '../../axios/albums'

const initialState = {
  dataAlbums: [],
  modal: {
    status: false,
    id: null
  },
  removableAlbumPhoto: {
    idAlbum: null,
    idPhoto: []
  },
  removableAlbum: {
    idAlbum: []
  }
}

const showModal = (state, action) => {
  return { ...state, modal: { status: true, id: action.payload } }
}

const hideModal = (state, action) => {
  return { ...state, modal: { status: false, id: null } }
}

const changeAlbumTitle = (state, action) => {
  let newAlbumInfo = {}
  let newDataAlbums = state.dataAlbums.map(album => {
    if (album !== null && album.id === action.payload.id) {
      album.title = action.payload.title
      instanceAlbums
        .get(`/albums/${action.payload.idUser}/${action.payload.id}/photo.json?auth=${action.payload.authToken}`)
        .then(response => {
          newAlbumInfo = {
            //id: album.id,
            photo: response.data,
            title: action.payload.title,
            userId: action.payload.idUser
          }
          console.log(newAlbumInfo)
          instanceAlbums
            .put(
              `/albums/${action.payload.idUser}/${action.payload.id}.json?auth=${action.payload.authToken}`,
              newAlbumInfo
            )
            .catch(error => {
              console.log(error)
            })
        })
    }
    return album
  })
  return { ...state, dataAlbums: newDataAlbums }
}

const addToRemovableAlbumPhoto = (state, action) => {
  let removebleAlbumIdPhoto = state.removableAlbumPhoto.idPhoto
  //console.log(action.payload)
  removebleAlbumIdPhoto.push(action.payload.idPhoto)
  return { ...state, removableAlbumPhoto: { idAlbum: action.payload.idAlbum, idPhoto: removebleAlbumIdPhoto } }
}

const deleteFromRemovableAlbumPhoto = (state, action) => {
  let removableAlbumIdPhoto = state.removableAlbumPhoto.idPhoto.map(idPhoto => {
    if (idPhoto !== action.payload.idPhoto) {
      return idPhoto
    }
    return undefined
  })
  return {
    ...state,
    removableAlbumPhoto: { idAlbum: action.payload.idAlbum, idPhoto: _.remove(removableAlbumIdPhoto, undefined) }
  }
}

const removeSelectedAlbumPhoto = (state, action) => {
  //console.log(action.payload)
  let newDataAlbumsPhoto = state.dataAlbums.map(album => {
    if (album !== null && album.id === state.removableAlbumPhoto.idAlbum) {
      let newIdPhoto = album.photo.filter(photo => {
        if (!_.includes(state.removableAlbumPhoto.idPhoto, photo.id)) {
          return true
        } else {
          instanceAlbums
            .delete(
              `/albums/${action.payload.idUser}/${album.id}/photo/${photo.id}.json/?auth=${action.payload.authToken}`
            )
            .catch(error => console.log(error))
        }
        return false
      })
      album.photo = newIdPhoto
    }
    return album
  })
  return { ...state, dataAlbums: newDataAlbumsPhoto, removableAlbumPhoto: { idAlbum: null, idPhoto: [] } }
}

const clearRemovableAlbmuPhoto = (state, action) => {
  return { ...state, removableAlbumPhoto: { idAlbum: null, idPhoto: [] } }
}

const addToRemovableAlbum = (state, action) => {
  let newRemovableAlbum = state.removableAlbum.idAlbum
  newRemovableAlbum.push(action.payload.idAlbum)
  return { ...state, removableAlbum: { idAlbum: _.uniq(newRemovableAlbum) } }
}

const deleteFromRemovableAlbum = (state, action) => {
  let newRemovableAlbum = state.removableAlbum.idAlbum.map(album => {
    if (album !== null && album !== action.payload.idAlbum) {
      return album
    }
    return undefined
  })
  return { ...state, removableAlbum: { idAlbum: _.remove(newRemovableAlbum, undefined) } }
}

const removeSelectedAlbums = (state, action) => {
  //console.log(state.dataAlbums)
  let newDataAlbum = state.dataAlbums.map(album => {
    if (album !== null) {
      if (!_.includes(state.removableAlbum.idAlbum, album.id)) {
        return album
      } else {
        instanceAlbums
          .delete(`/albums/${action.payload.idUser}/${album.id}.json/?auth=${action.payload.authToken}`)
          //.put(`/albums/${action.payload.idUser}/${album.id}.json/?auth=${action.payload.authToken}`, {})
          .catch(error => console.log(error))
      }
    }
    return undefined
  })
  newDataAlbum = newDataAlbum.filter(value => {
    return value !== undefined ? true : false
  })
  return { ...state, dataAlbums: newDataAlbum }
}

const addNewAlbum = (state, action) => {
  let newDataAlbums = state.dataAlbums.map(album => album)
  newDataAlbums.push(action.payload.newAlbum)
  instanceAlbums
    //.put(`/albums/${action.payload.idUser}.json/?auth=${action.payload.authToken}`, newDataAlbums)
    .post(`/albums/${action.payload.idUser}.json/?auth=${action.payload.authToken}`, action.payload.newAlbum)
    .catch(error => console.log(error))
  return { ...state, dataAlbums: newDataAlbums }
}

const loadAlbums = (state, action) => {
  return { ...state, dataAlbums: action.payload }
}

const loadPhoto = (state, action) => {
  return { ...state, dataAlbums: action.payload }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_MODAL:
      return showModal(state, action)
    case actionTypes.HIDE_MODAL:
      return hideModal(state, action)
    case actionTypes.CHANGE_TITLE_ALBUM:
      return changeAlbumTitle(state, action)
    case actionTypes.ADD_ALBUM_PHOTO_TO_REMOVABLE:
      return addToRemovableAlbumPhoto(state, action)
    case actionTypes.DELETE_ALBUM_PHOTO_FROM_REMOVABLE:
      return deleteFromRemovableAlbumPhoto(state, action)
    case actionTypes.REMOVE_ALBUM_PHOTO:
      return removeSelectedAlbumPhoto(state, action)
    case actionTypes.CLEAR_REMOVABLE_ALBUM_PHOTO:
      return clearRemovableAlbmuPhoto(state, action)
    case actionTypes.ADD_ALBUM_TO_REMOVABLE:
      return addToRemovableAlbum(state, action)
    case actionTypes.DELETE_ALBUM_FROM_REMOVABLE:
      return deleteFromRemovableAlbum(state, action)
    case actionTypes.REMOVE_ALBUMS:
      return removeSelectedAlbums(state, action)
    case actionTypes.ADD_NEW_ALBUM:
      return addNewAlbum(state, action)
    case actionTypes.LOAD_ALBUMS:
      return loadAlbums(state, action)
    case actionTypes.LOAD_PHOTO:
      return loadPhoto(state, action)
    default:
      return state
  }
}

export default reducer
