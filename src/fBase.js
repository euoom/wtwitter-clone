// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import {GithubAuthProvider, GoogleAuthProvider} from "firebase/auth"
import "firebase/compat/firestore"
import {collection, query, orderBy, onSnapshot} from "firebase/firestore"
import "firebase/compat/storage"
import {ref, uploadString, getDownloadURL} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const authService = app.auth()
export {GithubAuthProvider, GoogleAuthProvider}
export const dbService = app.firestore()
export {collection, query, onSnapshot, orderBy}
export const storageService = app.storage()
export {ref, uploadString, getDownloadURL}
export default app