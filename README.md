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

- React
    - All React components are just functions. The Controllers use a popular new React feature called [hooks](https://www.youtube.com/watch?v=dpw9EHDh2bM). The hooks allow state management and effects inside functional components. For example, the TodoFormController uses `useState` to keep temporary form state, only hitting Redux/Firebase when a Todo is submitted. Furthermore, the TodoController uses `useEffect` to send a notification when a Todo is upcomming in 5 minutes. Ideally the sending of notications should be entirely done on the backend (e.g. a Firebase function), but for this demo it should only work when the user is looking at the screen.
- Redux
    - 
