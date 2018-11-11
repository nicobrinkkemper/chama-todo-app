# Todo App

Hosted on [chama-hooks.firebaseapp.com](https://chama-hooks.firebaseapp.com/).
This project was done for Chama. Read the original assignment [here](https://github.com/chamatheapp/chama-frontend-assignment)

## About the code

**React** is used for the Controller/View layer. Furthermore, `create-react-app` is used to set up the development environment. This is really helpful because features such as reactive dom binding and JSX work out of the box.

**Redux** is used for our Model layer which serves to mirror our **Firebase Real-time Database**. **[React-firebase-redux](https://github.com/prescottprue/react-redux-firebase)** is used to handle most of that logic. This is why `modules/profile` and `modules/todos` contain selectors and creators, but no reducers. Cloud messaging is handled by some event listeners and a simple array reducer in `modules/notifications`.

**[React Hooks](https://www.youtube.com/watch?v=dpw9EHDh2bM)** allows functions to hook in to React state management and side-effect handling features. The `TodoFormController` uses `useState` to keep temporary form state, only hitting the store when a `Todo` is submitted. Furthermore, the `TodoController` uses `useEffect` to send a cloud message when a `Todo` is upcoming in 5 minutes, 4 minutes, etc. Lastly, our `AppController` uses `useEffect` to start-up a global timer to refresh `Todo.datetimetext` every 10 sec, and configure cloud messaging event listeners.

**Firebase Cloud Messaging** enable native and in-app push notifications. The app will only send notifications when it is active. When using the app for the first time you will be requested to allow notifications. Allowing this will give a fcm token which is stored on Firebase. Later on, when a `Todo` is nearing it's 5 minute deadline, a POST request will be made to a Firebase function called `sendNotifications`. This function will get the current user tokens and send a cloud message to all devices/browsers that the user has allowed.