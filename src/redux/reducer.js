import { combineReducers } from 'redux'
import { firebaseStateReducer as firebase } from 'react-redux-firebase'
import notifications from './modules/notifications'

export const rootReducer = combineReducers({
  firebase,
  notifications
})

export default rootReducer