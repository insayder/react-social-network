import * as actionTypes from './actionTypes'
import firebase from 'firebase'

export const profileFetchingStart = () => {
  return { type: actionTypes.PROFILE_FETCHING_START }
}

export const profileFetchingSucceed = profileData => {
  return { type: actionTypes.PROFILE_FETCHING_SUCCEED, profileData }
}

export const profileFetchingFail = error => {
  return { type: actionTypes.PROFILE_FETCHING_FAIL, error: error }
}

export const profileFetch = userId => {
  return dispatch => {
    dispatch(profileFetchingStart())

    firebase
      .database()
      .ref('profiles/' + userId)
      .on('value', function(snapshot) {
        dispatch(updateUserInfo(snapshot.val()))
      })
  }
}

export const profileStateReset = () => {
  return { type: actionTypes.PROFILE_STATE_RESET }
}

export const editorStart = () => {
  return { type: actionTypes.PROFILE_OPEN_EDITOR }
}

export const editorClose = () => {
  return { type: actionTypes.PROFILE_CLOSE_EDITOR }
}
export const updateUserInfo = updateData => {
  return { type: actionTypes.UPDATE_USER_INFO, updateData: updateData }
}

export const changeUserInfo = (userId, updateData) => {
  return dispatch => {
    let data = firebase
      .database()
      .ref('profiles/' + userId)
      .update({
        firstName: updateData.firstName,
        lastName: updateData.lastName,
        city: updateData.city,
        phone: updateData.phone
      })
  }
}
