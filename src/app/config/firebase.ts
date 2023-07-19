// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDoa9fC0KFuozPqo3ViQVbPgDgxgBo2sjs",
  authDomain: "chat-app-70640.firebaseapp.com",
  projectId: "chat-app-70640",
  storageBucket: "chat-app-70640.appspot.com",
  messagingSenderId: "39403221457",
  appId: "1:39403221457:web:445e26e4285871ba19b0f0",
  measurementId: "G-VTMEJ432HH",
};

// Initialize Firebase

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };
