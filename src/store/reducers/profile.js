import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'

const initialState = {
  firstName: '',
  lastName: '',
  photoURL: '',
  city: '',
  phone: '',
  loading: false,
  error: null
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
    default:
      return state
  }
}

export default reducer
