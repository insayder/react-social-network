import md5 from 'js-md5'

import * as actionTypes from './actionTypes'
import { axiosProfile } from '../../axios/profile'
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

export const profileViewedUserFetchingStart = () => {
  return { type: actionTypes.PROFILE_VIEWED_USER_FETCHING_START }
}

export const profileViewedUserFetchingSucceed = profileData => {
  return { type: actionTypes.PROFILE_VIEWED_USER_FETCHING_SUCCEED, profileData }
}

export const profileViewedUserFetchingFail = error => {
  return { type: actionTypes.PROFILE_VIEWED_USER_FETCHING_FAIL, error }
}

export const profileFetch = (userId, idToken, isSelfProfile = true) => {
  return dispatch => {
    if (isSelfProfile) {
      dispatch(profileFetchingStart())
    } else {
      dispatch(profileViewedUserFetchingStart())
    }
    const url = `/${userId}.json?auth=${idToken}`
    axiosProfile
      .get(url)
      .then(response => {
        if (isSelfProfile) {
          dispatch(profileFetchingSucceed(response.data))
        } else {
          dispatch(profileViewedUserFetchingSucceed(response.data))
        }
      })
      .catch(error => {
        if (isSelfProfile) {
          dispatch(profileFetchingFail(error))
        } else {
          dispatch(profileViewedUserFetchingFail(error))
        }
  }
}
}


export const profileCreate = (userId, idToken, email, profileData = null) => {
  return dispatch => {
    const profileURL = `/${userId}.json?auth=${idToken}`
    const emailHash = md5.create().update(email.toLowerCase())
    if (!profileData) {
      profileData = {
        firstName: '',
        lastName: '',
        phone: '',
        city: '',
        photoURL: `https://www.gravatar.com/avatar/${emailHash.hex()}?d=identicon&s=300`,
        new: true
      }
    }
    axiosProfile
      .put(profileURL, profileData)
      .then(response => {
        dispatch(updateUserInfo(profileData))
      })
      .catch(error => {
        console.log(error)
        console.log("Error. Can't create new profile")
      })
  }
}

export const profileUpdate = (userId, idToken, profileData) => {
  return dispatch => {
    dispatch(profileUpdatingStart())
    const url = `/${userId}.json?auth=${idToken}`
    axiosProfile
      .patch(url, profileData)
      .then(response => {
        dispatch(profileUpdatingSucceed(profileData))
      })
      .catch(error => {
        dispatch(profileUpdatingFail(error))
      })
  }
}

export const profileUpdatingStart = () => {
  return { type: actionTypes.PROFILE_UPDATING_START }
}

export const profileUpdatingSucceed = profileData => {
  return { type: actionTypes.PROFILE_UPDATING_SUCCEED, profileData }
}

export const profileUpdatingFail = error => {
  return { type: actionTypes.PROFILE_UPDATING_FAIL, error: error }
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
    console.log(updateData)
    firebase
      .database()
      .ref('profiles/' + userId)
      .update(updateData)
    dispatch(updateUserInfo(updateData))
  }
}

export const changeAvatar = (userId, fileName, userState) => {
  return dispatch => {
    firebase
      .storage()
      .ref('avatars')
      .child(fileName)
      .getDownloadURL()
      .then(url => {
        dispatch(changeUserInfo(userId, { ...userState, photoUrl: url }))
      })
  }
}