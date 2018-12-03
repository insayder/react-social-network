import { combineReducers } from 'redux'

import authReducer from './auth'
import albumsReducer from './albums'
import profileReducer from './profile'
import taskReducer from './task'
import postsReducer from './posts'

const rootReducer = combineReducers({
  auth: authReducer,
  albums: albumsReducer,
  profile: profileReducer,
  task: taskReducer,
  posts: postsReducer
})

export default rootReducer
