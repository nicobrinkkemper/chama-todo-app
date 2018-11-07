import { combineReducers } from 'redux'
import { firebaseStateReducer } from 'react-redux-firebase'
import app from './app'

export const rootReducer = combineReducers({
  firebase:firebaseStateReducer,
  app
})

export default rootReducer