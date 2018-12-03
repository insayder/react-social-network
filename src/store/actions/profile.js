import md5 from 'js-md5'

import * as actionTypes from './actionTypes'
import { axiosProfile } from '../../axios/profile'

export const profileFetchingStart = () => {
  return { type: actionTypes.PROFILE_FETCHING_START }
}

export const profileFetchingSucceed = profileData => {
  return { type: actionTypes.PROFILE_FETCHING_SUCCEED, profileData }
}

export const profileFetchingFail = error => {
  return { type: actionTypes.PROFILE_FETCHING_FAIL, error: error }
}

export const profileFetch = (userId, idToken) => {
  return dispatch => {
    dispatch(profileFetchingStart())
    const url = `/${userId}.json?auth=${idToken}`
    axiosProfile
      .get(url)
      .then(response => {
        dispatch(profileFetchingSucceed(response.data))
      })
      .catch(error => {
        dispatch(profileFetchingFail(error))
      })
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

export const getUserInfo = id => {
  return { type: actionTypes.USER_INFO }
}

export const updateUserInfo = updateData => {
  return { type: actionTypes.UPDATE_USER_INFO, updateData: updateData }
}
