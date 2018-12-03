import { axiosAuth, axiosRefreshToken } from '../../axios/auth'
import * as actionTypes from './actionTypes'
import { API_KEY } from '../../constants/auth'
import { profileFetch, profileStateReset, profileCreate } from './profile'
import firebase from 'firebase'

export const authStart = (email, password) => {
  return { type: actionTypes.AUTH_START }
}
export const authSuccess = authData => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData
  }
}
export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  }
}

export const authLogout = tokenRefreshTimeoutId => {
  return dispatch => {
    dispatch(authStateReset())
    dispatch(profileStateReset())
    localStorage.removeItem('token')
    localStorage.removeItem('tokenExpirationDate')
    localStorage.removeItem('userId')
    localStorage.removeItem('refreshToken')
    clearTimeout(tokenRefreshTimeoutId)
  }
}

export const authStateReset = () => {
  return { type: actionTypes.AUTH_STATE_RESET }
}

export const authSetRefreshTimeoutId = tokenRefreshTimeoutId => {
  return {
    type: actionTypes.AUTH_SET_REFRESH_TIMEOUT_ID,
    tokenRefreshTimeoutId
  }
}

export const setAuthTimeoutChecker = tokenExpirationInterval => {
  return dispatch => {
    const tokenRefreshTimeoutId = setTimeout(() => {
      dispatch(authRefreshIdToken())
    }, tokenExpirationInterval * 1000)
    dispatch(authSetRefreshTimeoutId(tokenRefreshTimeoutId))
  }
}

export const authRefreshIdToken = () => {
  return dispatch => {
    const refreshToken = localStorage.getItem('refreshToken')
    if (refreshToken !== 'undefined' && refreshToken !== null) {
      const remember = true
      const url = `/token?key=${API_KEY}`
      const payload = { grant_type: 'refresh_token', refresh_token: refreshToken }
      axiosRefreshToken
        .post(url, payload)
        .then(response => {
          let authData = {
            refreshToken: response.data.refresh_token,
            idToken: response.data.id_token,
            localId: response.data.user_id,
            expiresIn: response.data.expires_in
          }
          dispatch(processAuthResponse(authData, remember))
        })
        .catch(error => {
          dispatch(authLogout())
          dispatch(authFail(error))
        })
    } else {
      dispatch(authLogout())
    }
  }
}

export const updateAuthData = (authData, remember = null) => {
  return dispatch => {
    const tokenExpirationDate = new Date(new Date().getTime() + authData.expiresIn * 1000)
    localStorage.setItem('token', authData.idToken)
    localStorage.setItem('tokenExpirationDate', tokenExpirationDate)
    localStorage.setItem('userId', authData.localId)
    if (remember) {
      localStorage.setItem('refreshToken', authData.refreshToken)
    }
    dispatch(authSuccess(authData))
  }
}
export const auth = (email, password, remember, isLogin) => {
  return dispatch => {
    dispatch(authStart())
    const authData = { email, password, returnSecureToken: true }
    const url = isLogin ? `/verifyPassword?key=${API_KEY}` : `/signupNewUser?key=${API_KEY}`
    axiosAuth
      .post(url, authData)
      .then(response => {
        if (!isLogin) {
          dispatch(profileCreate(response.data.localId, response.data.idToken, email))
        }
        dispatch(processAuthResponse(response.data, remember))
        dispatch(processAuthResponse(response, remember))
      })
      .catch(error => {
        dispatch(authFail(error))
      })
  }
}

const processAuthResponse = (responseData, remember) => {
  return dispatch => {
    dispatch(updateAuthData(responseData, remember))
    dispatch(setAuthTimeoutChecker(responseData.expiresIn))
  }
}

export const authCheckLoginStatus = () => {
  return dispatch => {
    const userId = localStorage.getItem('userId')
    const token = localStorage.getItem('token')
    let tokenExpirationDate = localStorage.getItem('tokenExpirationDate')

    if (!userId || !token || !tokenExpirationDate) {
      dispatch(authLogout())
      return
    }

    tokenExpirationDate = new Date(tokenExpirationDate)
    if (tokenExpirationDate > new Date()) {
      dispatch(authSuccess({ localId: userId, idToken: token }))
      dispatch(setAuthTimeoutChecker((tokenExpirationDate.getTime() - new Date().getTime()) / 1000))
    } else {
      dispatch(authRefreshIdToken())
    }
  }
}
