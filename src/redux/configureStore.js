import { createStore, applyMiddleware, compose } from 'redux';
import { reactReduxFirebase } from 'react-redux-firebase'

import { fire } from '../firebase/firebase'
import rootReducer from './reducer';
import timerMiddleware from 'redux-timer-middleware'

const rrfConfig = {
  userProfile: 'users',
  todos: 'todos'
}
const composeEnhancers =
  typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;
const createStoreWithMiddleware = composeEnhancers(applyMiddleware(timerMiddleware))(createStore);


export const configureStore = (initialState) => {
  const createStoreWithFirebase = compose(
    reactReduxFirebase(fire, rrfConfig),
  )(createStoreWithMiddleware)
  const store = createStoreWithFirebase(rootReducer, {});
  return store;
}
export default configureStore;