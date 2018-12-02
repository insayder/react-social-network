import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'

const initialState = {
  token: null,
  userId: null,
  tokenRefreshTimeoutId: null,
  error: null,
  loading: false,
  redirectToReferrer: false
}

const authStart = (state, action) => {
  return updateObject(state, { loading: true })
}

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.authData.idToken,
    userId: action.authData.localId,
    loading: false,
    error: null,
    redirectToReferrer: true
  })
}

const authFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false })
}

const authReset = (state, action) => {
  return updateObject(state, {
    token: null,
    userId: null,
    error: null,
    loading: false,
    tokenRefreshTimeoutId: null,
    redirectToReferrer: false
  })
}

const authSetRefreshTimeoutId = (state, action) => {
  return updateObject(state, { tokenRefreshTimeoutId: action.tokenRefreshTimeoutId })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action)
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action)
    case actionTypes.AUTH_FAIL:
      return authFail(state, action)
    case actionTypes.AUTH_STATE_RESET:
      return authReset(state, action)
    case actionTypes.AUTH_SET_REFRESH_TIMEOUT_ID:
      return authSetRefreshTimeoutId(state, action)
    default:
      return state
  }
}

export default reducer
