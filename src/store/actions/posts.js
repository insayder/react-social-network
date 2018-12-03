import * as actionTypes from './actionTypes'
import { axiosPosts } from '../../axios/posts'

export const postsCreate = (body, date, parentPostId, userId, userName, photoURL, idToken) => {
  return dispatch => {
    dispatch(postsCreatingStart())
    const url = `/?auth=${idToken}`
    const postData = { body, date, parentPostId, userId, userName, photoURL }

    axiosPosts
      .post(url, postData)
      .then(response => {
        const postData = {
          [response.data.name]: { body, date, parentPostId, userId, userName, photoURL }
        }
        dispatch(postsCreatingSucceed(postData))
      })
      .catch(error => {
        dispatch(postsCreatingFail(error))
      })
  }
}

export const postsCreatingStart = () => {
  return { type: actionTypes.POSTS_CREATING_START }
}
export const postsCreatingSucceed = postData => {
  return { type: actionTypes.POSTS_CREATING_SUCCEED, postData }
}
export const postsCreatingFail = error => {
  return { type: actionTypes.POSTS_CREATING_FAIL, error }
}
export const postsFetch = (userId, idToken) => {
  return dispatch => {
    dispatch(postsFetchingStart())
    const url = `/?orderBy="userId"&equalTo="${userId}"&auth=${idToken}`
    axiosPosts
      .get(url)
      .then(response => {
        dispatch(postsFetchingSucceed(response.data))
      })
      .catch(error => {
        console.log(error)
        dispatch(postsFetchingFail(error))
      })
  }
}

export const postsFetchingStart = () => {
  return { type: actionTypes.POSTS_FETCHING_START }
}

export const postsFetchingSucceed = posts => {
  return { type: actionTypes.POSTS_FETCHING_SUCCEED, posts }
}

export const postsFetchingFail = error => {
  return { type: actionTypes.POSTS_FETCHING_FAIL, error }
}
