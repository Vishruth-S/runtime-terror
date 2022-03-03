import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import { getFirestore } from '@firebase/firestore'
import { getAuth } from 'firebase/auth'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyBkl1k1vW7toiNtJyTB4lhfSVUuEglXEi4",
    authDomain: "runtime-terror-85c1b.firebaseapp.com",
    projectId: "runtime-terror-85c1b",
    storageBucket: "runtime-terror-85c1b.appspot.com",
    messagingSenderId: "700973761211",
    appId: "1:700973761211:web:928ef4a910e8f3cdc1df9e"
};

const fireApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
export { db, auth, fireApp }
