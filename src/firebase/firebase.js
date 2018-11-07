import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/messaging';
import 'firebase/functions';
require('cors')({ origin: true })
export const config = {
    apiKey: "AIzaSyCcSDFLCkpRMSeujLrSdQqYb3iwQk7fS-M",
    authDomain: "chama-hooks.firebaseapp.com",
    databaseURL: "https://chama-hooks.firebaseio.com",
    projectId: "chama-hooks",
    storageBucket: "chama-hooks.appspot.com",
    messagingSenderId: "518384846061"
};
firebase.initializeApp(config)
export const database = firebase.database();
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const messaging = firebase.messaging();
export const sendNotifications = firebase.functions().httpsCallable('sendNotifications')
export const fire = firebase;
export default firebase;