import { combineReducers } from 'redux'

import authReducer from './auth'
import albumsReducer from './albums'
import profileReducer from './profile'
import taskReducer from './task'

const rootReducer = combineReducers({
  auth: authReducer,
  albums: albumsReducer,
  profile: profileReducer,
  task: taskReducer
})

export default rootReducer
