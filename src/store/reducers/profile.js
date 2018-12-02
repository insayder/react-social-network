import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'

const initialState = {
  firstName: '',
  lastName: '',
  photoURL: '',
  city: '',
  phone: '',
  new: true,
  loading: false,
  error: null,
  editorActive: false,
  viewedUserProfile: {
    firstName: '',
    lastName: '',
    photoURL: '',
    city: '',
    phone: '',
    loading: false,
    error: null,
    userId: ''
  }
}

const profileFetchingStart = (state, action) => {
  return updateObject(state, { loading: true })
}
const profileFetchingSucceed = (state, action) => {
  return updateObject(state, {
    ...action.profileData,
    loading: false
  })
}
const profileFetchingFail = (state, action) => {
  return updateObject(state, { loading: false, error: action.error })
}

const editorStart = (state, action) => {
  return { ...state, editorActive: true }
}

const editorClose = (state, action) => {
  return { ...state, editorActive: false }
}

const updateUserInfo = (state, action) => {
  if (action.updateData == null) {
    return state
  }
  return updateObject(state, {
    firstName: action.updateData.firstName,
    lastName: action.updateData.lastName,
    city: action.updateData.city,
    phone: action.updateData.phone,
    photoURL: state.photoURL
  })
}

const profileViewedUserFetchingStart = (state, action) => {
  const updatedViewedUserProfile = updateObject(state.viewedUserProfile, { loading: true })
  return updateObject(state, updatedViewedUserProfile)
}

const profileViewedUserFetchingSucceed = (state, action) => {
  const updatedViewedUserProfile = updateObject(state.viewedUserProfile, {
    firstName: action.profileData.firstName,
    lastName: action.profileData.lastName,
    photoURL: action.profileData.photoURL,
    city: action.profileData.city,
    phone: action.profileData.phone,
    loading: false
  })
  return updateObject(state, { viewedUserProfile: updatedViewedUserProfile })
}

const profileViewedUserFetchingFail = (state, action) => {
  const updatedViewedUserProfile = updateObject(state.viewedUserProfile, {
    error: action.error,
    loading: false
  })
  return updateObject(state, updatedViewedUserProfile)
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PROFILE_FETCHING_START:
      return profileFetchingStart(state, action)
    case actionTypes.PROFILE_FETCHING_SUCCEED:
      return profileFetchingSucceed(state, action)
    case actionTypes.PROFILE_FETCHING_FAIL:
      return profileFetchingFail(state, action)
    case actionTypes.PROFILE_STATE_RESET:
      return initialState
    case actionTypes.PROFILE_OPEN_EDITOR:
      return editorStart(state, action)
    case actionTypes.PROFILE_CLOSE_EDITOR:
      return editorClose(state, action)
    case actionTypes.UPDATE_USER_INFO:
      return updateUserInfo(state, action)
    case actionTypes.PROFILE_UPDATING_START:
      return profileUpdatingStart(state, action)
    case actionTypes.PROFILE_UPDATING_SUCCEED:
      return profileUpdatingSucceed(state, action)
    case actionTypes.PROFILE_UPDATING_FAIL:
      return profileUpdatingFail(state, action)
    case actionTypes.PROFILE_VIEWED_USER_FETCHING_START:
      return profileViewedUserFetchingStart(state, action)
    case actionTypes.PROFILE_VIEWED_USER_FETCHING_SUCCEED:
      return profileViewedUserFetchingSucceed(state, action)
    case actionTypes.PROFILE_VIEWED_USER_FETCHING_FAIL:
      return profileViewedUserFetchingFail(state, action)
    default:
      return state
  }
}

export default reducer
