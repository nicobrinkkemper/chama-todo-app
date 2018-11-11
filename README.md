# Todo App

Hosted on [chama-hooks.firebaseapp.com](https://chama-hooks.firebaseapp.com/).
This project was done for Chama. Read the original assignment [here](https://github.com/chamatheapp/chama-frontend-assignment)

## What does it feature?

### Real-time UI
Adding and completing todo's will sync across multiple devices with **Firebase database**. This requires a login with your Google account.

### Reactive
All user actions will be immediatly represented in the UI with the help of **React**. 

### Push notifications
Push notifications as well as on-screen notifications will be send to all devices when a todo is due date with **Firebase Cloud Messaging**.
Make sure to allow noticiations. Don't worry, it will only do so when you look at the screen.

## Design choises

### Hooks

Controllers use a popular new React feature called [hooks](https://www.youtube.com/watch?v=dpw9EHDh2bM) to allow state management and effects inside functional components. For example, the TodoFormController uses `useState` to keep temporary form state, only hitting Redux/Firebase when a Todo is submitted. Furthermore, the TodoController uses `useEffect` to send a notification when a Todo is upcomming in 5 minutes. Lastly, our main App component uses `useEffect` to start-up a global timer to update the timefields, and starts up cloud messaging feature.

### Redux

Most part of redux is handled by [react-firebase-redux](https://github.com/prescottprue/react-redux-firebase). This is why the `profile` and `todos` modules only contain some selectors and creators. Cloud messaging is handled by the `notifications` module and is just a simple array that gets put in to [react-bs-notifier](https://github.com/chadly/react-bs-notifier) to show the alert.

### Cloud messaging

When using the app for the first time you will be requested to allow notifications. Allowing this will give a fcm token. The token is stored on firebase. Later on, when a todo is nearing it's 5 minute deadline, a POST request will be made to a firebase function called `sendNotifications`. This function will get the current users tokens and send a cloud message to all devices/browsers that the user has allowed.