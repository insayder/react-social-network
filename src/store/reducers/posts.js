import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'

const initialState = {
  posts: {},
  creatingPost: false,
  error: null,
  fetching: false
}

const postsCreatingPostStart = (state, action) => {
  return updateObject(state, { creatingPost: true })
}
const postsCreatingPostSucceed = (state, action) => {
  const updatedPosts = updateObject(state.posts, action.postData)
  return updateObject(state, { posts: updatedPosts, creatingPost: false })
}
const postsCreatingPostFail = (state, action) => {
  return updateObject(state, { error: action.error, creatingPost: false })
}

const postsFetchingStart = (state, action) => {
  return updateObject(state, { fetching: true })
}
const postsFetchingSucceed = (state, action) => {
  return updateObject(state, { posts: action.posts, fetching: false })
}
const postsFetchingFail = (state, action) => {
  return updateObject(state, { error: action.error, fetching: false })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.POSTS_CREATING_START:
      return postsCreatingPostStart(state, action)
    case actionTypes.POSTS_CREATING_SUCCEED:
      return postsCreatingPostSucceed(state, action)
    case actionTypes.POSTS_CREATING_FAIL:
      return postsCreatingPostFail(state, action)
    case actionTypes.POSTS_FETCHING_START:
      return postsFetchingStart(state, action)
    case actionTypes.POSTS_FETCHING_SUCCEED:
      return postsFetchingSucceed(state, action)
    case actionTypes.POSTS_FETCHING_FAIL:
      return postsFetchingFail(state, action)
    default:
      return state
  }
}

export default reducer
