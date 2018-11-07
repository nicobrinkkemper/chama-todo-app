import React, { useEffect } from "react";
import ReactDOM from "react-dom";

import { SubstateProvider } from "use-substate";
import { Provider } from "react-redux"
import TodoList from "./components/TodoList/";
import TodoForm from "./components/TodoForm/";
import configureStore from "./redux/configureStore";
import { BottomNav } from "./components/BottomNav";
import { firebaseConnect } from "react-redux-firebase";
import { compose } from 'redux';
import { connect } from 'react-redux'
import { selectTodos, createTodo, createTimer, createStopTimer } from "./redux/app";
import { sendNotifications, messaging } from "./firebase/firebase";



const AppController = (props) => {
  const { startTimer, stopTimer, setUpMessaging, setFCM, userFieldId } = props
  useEffect(
    () => {
      if (userFieldId) {
        setUpMessaging(userFieldId, setFCM)
        startTimer()
        return () => stopTimer()
      }
    },
    [userFieldId]
  )
  return (
    <div>
      <TodoForm {...props} />
      {props.uid ? <TodoList {...props} /> : null}
      <BottomNav {...props} />
    </div>
  );
}

export const App = compose(
  firebaseConnect(['users']),
  connect(
    state => {
      return {
        ...state,
        uid: state.app.uid,
        userFieldId: state.app.userFieldId,
        todos: selectTodos(state.app)
      }
    },
    (dispatch, { firebase }) => ({
      login: () => {
        firebase.login({
          provider: 'google',
          type: 'popup'
        })
      },
      logout: () => {
        firebase.logout()
      },
      notify: sendNotifications,
      setFCM: (fcm, userFieldId) => {
        console.log('set token')
        firebase.set(`users/${userFieldId}/notificationTokens/${fcm}`, true)
      },
      toggleTodo: (payload, uid) => {
        firebase.set(`todos/${uid}/${payload.id}/completed`, !payload.completed)
      },
      addTodo: (payload, uid) => {
        if (!uid) {
          firebase.login({
            provider: 'google',
            type: 'popup'
          })
          return false
        }
        const todo = createTodo(payload)
        return firebase.set(`todos/${uid}/${todo.id}`, todo)
      },
      startTimer: () => {
        dispatch(createTimer())
      },
      stopTimer: () => {
        dispatch(createStopTimer())
      },
      setUpMessaging: (userFieldId, onReceiveToken) => {
        messaging.onTokenRefresh(()=>{
          messaging.getToken().then(function (refreshedToken) {
            onReceiveToken(refreshedToken, userFieldId)
          }).catch(function (err) {
            console.log('Unable to retrieve refreshed token ', err);
          });
        });
        messaging
          .requestPermission()
          .then(
            () => {
              return messaging.getToken();
            }).then(
              token => onReceiveToken(token, userFieldId)
            )
          .catch(error => {
            if (error.code === "messaging/permission-blocked") {
              console.log("Please Unblock Notification Request Manually");
            } else {
              console.log("Error Occurred", error);
            }
          });
        return () => {
          messaging.onTokenRefresh(undefined)
        };
      }
    })
  )
)(AppController)

const store = configureStore(
  { todos: [] }
);
const rootElement = document.getElementById("root");
ReactDOM.render(<SubstateProvider value={store}><Provider store={store}><App /></Provider></SubstateProvider>, rootElement);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./firebase-messaging-sw.js')
    .then(function (registration) {
      console.log('Registration successful, scope is:', registration.scope);
    }).catch(function (err) {
      console.log('Service worker registration failed, error:', err);
    });
}