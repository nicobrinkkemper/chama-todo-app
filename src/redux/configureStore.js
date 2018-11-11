import { createStore, applyMiddleware, compose } from 'redux';
import { reactReduxFirebase } from 'react-redux-firebase'

import { fire } from '../firebase/firebase'
import rootReducer from './reducer';
import timerMiddleware from 'redux-timer-middleware'

const rrfConfig = {
  userProfile: 'users'
}
const composeEnhancers =
  typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;
const createStoreWithMiddleware = composeEnhancers(applyMiddleware(timerMiddleware))(createStore);


export const configureStore = (initialState) => {
  const createStoreWithFirebase = compose(
    reactReduxFirebase(fire, rrfConfig),
  )(createStoreWithMiddleware)
  const store = createStoreWithFirebase(rootReducer, {});

  if (module.hot) {
    module.hot.accept('./reducer', () => {
      const nextRootReducer = require('./reducer')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store;
}
export default configureStore;