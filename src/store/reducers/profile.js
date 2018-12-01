import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'

const initialState = {
  firstName: '',
  lastName: '',
  photoURL: '',
  city: '',
  phone: '',
  loading: false,
  error: null,
  editorActive: false
}

const profileFetchingStart = (state, action) => {
  return updateObject(state, { loading: true })
}
const profileFetchingSucceed = (state, action) => {
  return updateObject(state, {
    firstName: action.profileData.firstName,
    lastName: action.profileData.lastName,
    photoURL: action.profileData.photoURL,
    city: action.profileData.city,
    phone: action.profileData.phone,
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
  return updateObject(state, {
    firstName: action.updateData.firstName,
    lastName: action.updateData.lastName,
    city: action.updateData.city,
    phone: action.updateData.phone
  })
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
    default:
      return state
  }
}

export default reducer
