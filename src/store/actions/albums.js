import * as actionTypes from './actionTypes'
import { instanceAlbums } from '../../axios/albums'
// import _ from 'lodash'

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

export const removeAlbumPhoto = objAuth => {
  return { type: actionTypes.REMOVE_ALBUM_PHOTO, payload: objAuth }
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

export const removeAlbum = objAuth => {
  return { type: actionTypes.REMOVE_ALBUMS, payload: objAuth }
}

export const addNewAlbum = objNewAlbum => dispatch => {
  //return { type: actionTypes.ADD_NEW_ALBUM, payload: objNewAlbum }
  instanceAlbums
    .post(`/albums/${objNewAlbum.idUser}.json/?auth=${objNewAlbum.authToken}`, objNewAlbum.newAlbum)
    .then(response => {
      if (response.status === 200) {
        return instanceAlbums.get(`albums/${objNewAlbum.idUser}.json/?auth=${objNewAlbum.authToken}`)
      }
    })
    .then(response => {
      let processedData = []
      console.log(response)
      for (let key in response.data) {
        response.data[key].id = key
        if (response.data[key].photo !== undefined && response.data[key].photo !== null) {
          let processedDataPhoto = []
          for (let keyPhoto in response.data[key].photo) {
            response.data[key].photo[keyPhoto].id = keyPhoto
            processedDataPhoto.push(response.data[key].photo[keyPhoto])
          }
          response.data[key].photo = processedDataPhoto
        }
        processedData.push(response.data[key])
      }
      /*let resultProcessedData = processedData.filter((album, key) => {
        return album !== null && album !== undefined ? true : false
      })*/
      dispatch({ type: actionTypes.LOAD_ALBUMS, payload: processedData })
    })
    .catch(error => console.log(error))
}

export const loadAlbums = (userId, authToken) => dispatch => {
  instanceAlbums
    .get(`albums/${userId}.json/?auth=${authToken}`)
    .then(response => {
      let processedData = []
      //console.log(response)
      for (let key in response.data) {
        response.data[key].id = key
        if (response.data[key].photo !== undefined && response.data[key].photo !== null) {
          let processedDataPhoto = []
          for (let keyPhoto in response.data[key].photo) {
            response.data[key].photo[keyPhoto].id = keyPhoto
            processedDataPhoto.push(response.data[key].photo[keyPhoto])
          }
          response.data[key].photo = processedDataPhoto
        }
        processedData.push(response.data[key])
      }
      /*let resultProcessedData = processedData.filter((album, key) => {
        return album !== null && album !== undefined ? true : false
      })*/
      dispatch({ type: actionTypes.LOAD_ALBUMS, payload: processedData })
    })
    .catch(error => {
      console.log(error)
    })
}

export const loadPhotoToDB = objPhoto => dispatch => {
  Promise.all(
    objPhoto.photo.map(value => {
      return instanceAlbums.post(
        `/albums/${objPhoto.idUser}/${value.idAlbum}/photo.json/?auth=${objPhoto.authToken}`,
        value
      )
    })
  )
    .then(response => {
      if (response[response.length - 1].status === 200) {
        return instanceAlbums.get(`albums/${objPhoto.idUser}.json/?auth=${objPhoto.authToken}`)
      }
    })
    .then(response => {
      let processedData = []
      for (let key in response.data) {
        response.data[key].id = key
        if (response.data[key].photo !== undefined && response.data[key].photo !== null) {
          let processedDataPhoto = []
          for (let keyPhoto in response.data[key].photo) {
            response.data[key].photo[keyPhoto].id = keyPhoto
            processedDataPhoto.push(response.data[key].photo[keyPhoto])
          }
          response.data[key].photo = processedDataPhoto
        }
        processedData.push(response.data[key])
      }
      /*let resultProcessedData = processedData.filter((album, key) => {
        return album !== null && album !== undefined ? true : false
      })*/
      dispatch({ type: actionTypes.LOAD_ALBUMS, payload: processedData })
    })
    .catch(error => console.log(error))
}
