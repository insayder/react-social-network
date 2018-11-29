import { combineReducers } from 'redux'

import authReducer from './auth'
import albumsReducer from './albums'
import profileReducer from './profile'

const rootReducer = combineReducers({
  auth: authReducer,
  albums: albumsReducer,
  profile: profileReducer
})

export default rootReducer
