import { auth, provider } from './firebase';

export const doCreateUserWithEmailAndPassword = (email, password) =>
    auth.createUserWithEmailAndPassword(email, password);

export const doSignUpWithPopup = () => auth.signInWithPopup(provider)

export const doSignInWithPopup = () => auth.signInWithPopup(provider)
export const doSignOut = () =>
    auth.signOut();