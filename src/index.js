import React, { useEffect } from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux"
import TodoList from "./components/TodoList/";
import TodoForm from "./components/TodoForm/";
import configureStore from "./redux/configureStore";
import { BottomNav } from "./components/BottomNav";
import { firebaseConnect } from "react-redux-firebase";
import { compose } from 'redux';
import { connect } from 'react-redux'
import { sendNotifications, messaging } from "./firebase/firebase";
import { createRemoveNotification, createNotification } from "./redux/modules/notifications";
import { createTodo, createStartUpdateTimeFields, createStopUpdateTimeFields } from "./redux/modules/todos";
import { isInitialising } from "./redux/modules/profile";
import Spinner from 'react-spinkit';

const AppController = (props) => {
  const { startTimer, stopTimer, startCloudMessaging, stopCloudMessaging, setNotificationToken, uid, profile } = props
  useEffect(
    () => {
      if (!uid) return;
      startCloudMessaging(fcm => setNotificationToken(uid, fcm))
      startTimer()
      return () => {
        stopCloudMessaging()
        stopTimer()
      }
    },
    [uid]
  )
  return (
    <div>
      <TodoForm {...props} />
      {
        !uid
          ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 100 }}>
              {!profile.isLoaded ? (<Spinner name='double-bounce' />) : ''}
            </div>
          ) : (
            <div style={{ minHeight: 200 }}>
              <TodoList {...props} />
            </div>
          )
      }
      <BottomNav {...props} />
    </div>
  );
}

const mapStateToProps = (state) => {
  if (isInitialising(state.firebase.profile)) return {
    profile: state.firebase.profile
  };
  return {
    profile: state.firebase.profile,
    uid: state.firebase.auth.uid,
    notifications: state.notifications
  };
}

const mapDispatchToProps = (dispatch, { firebase }) => ({
  login: () => {
    firebase.login({
      provider: 'google',
      type: 'popup'
    })
  },
  logout: () => {
    firebase.logout()
  },
  removeNotification: (id) => {
    dispatch(createRemoveNotification(id))
  },
  notify: (todo)=>sendNotifications({...todo, text: todo.text + ' ' + todo.datetimetext}),
  setNotificationToken: (uid, fcm) => {
    firebase.set(`notificationTokens/${uid}/${fcm}`, true)
  },
  toggleTodo: (payload, uid) => {
    firebase.set(`todos/${uid}/${payload.id}/completed`, !payload.completed)
  },
  addTodo: (payload, uid) => {
    const todo = createTodo(payload)
    return firebase.set(`todos/${uid}/${todo.id}`, todo)
  },
  startTimer: () => {
    dispatch(createStartUpdateTimeFields())
  },
  stopTimer: () => {
    dispatch(createStopUpdateTimeFields())
  },
  startCloudMessaging: (onReceiveToken) => {
    console.log('start messaging')
    messaging.onTokenRefresh(() => {
      messaging.getToken().then(function (refreshedToken) {
        onReceiveToken(refreshedToken)
      }).catch(function (err) {
        console.log('Unable to retrieve refreshed token ', err);
      });
    });
    messaging.onMessage((payload) => {
      dispatch(createNotification(payload))
    });
    messaging
      .requestPermission()
      .then(
        () => messaging.getToken()
      ).then(
        token => onReceiveToken(token)
      )
      .catch(error => {
        if (error.code === "messaging/permission-blocked") {
          console.log("Please Unblock Notification Request Manually");
        } else {
          console.log("Error Occurred", error);
        }
      });
  },
  stopCloudMessaging: () => {
    console.log('stop messaging')
    messaging.onMessage(() => { })
    messaging.onTokenRefresh(() => { })
  },
})

export const App = compose(
  firebaseConnect([]),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(AppController)

const store = configureStore(
  {}
);
const rootElement = document.getElementById("root");
ReactDOM.render(<Provider store={store}><App /></Provider>, rootElement);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./firebase-messaging-sw.js')
    .then(function (registration) {
      console.log('Registration successful, scope is:', registration.scope);
    }).catch(function (err) {
      console.log('Service worker registration failed, error:', err);
    });
}