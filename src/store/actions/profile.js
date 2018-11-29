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

export const profileStateReset = () => {
  return { type: actionTypes.PROFILE_STATE_RESET }
}
