import { combineReducers } from 'redux'

import authReducer from './auth'
import albumsReducer from './albums'

const rootReducer = combineReducers({
  auth: authReducer,
  albums: albumsReducer
})

export default rootReducer
