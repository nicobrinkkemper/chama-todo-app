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
messaging.usePublicVapidKey("BN8krSM0CRd6YdRwSXa1xosJyF0236U39Ftk27Rr7lnkrLtsAba9XQ4cUSGyQMkzRkhEJ7iaR1p6WOjHFNRRdu0");
export const sendNotifications = firebase.functions().httpsCallable('sendNotifications')
export const fire = firebase;
export default firebase;