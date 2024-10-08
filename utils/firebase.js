// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1QEmDRRIhHut6Fwy6kS260yz5aWp_iYE",
  authDomain: "ace-cards-9610b.firebaseapp.com",
  projectId: "ace-cards-9610b",
  storageBucket: "ace-cards-9610b.appspot.com",
  messagingSenderId: "278714058059",
  appId: "1:278714058059:web:aa2ece37bf298da028d4ce",
  measurementId: "G-8CTQTHGSY1"
};

// Initialize Firebase
let app;
let analytics;
let auth;
let firestore;

if (typeof window !== 'undefined') {
  app = initializeApp(firebaseConfig);
  analytics = getAnalytics(app);
  auth = getAuth(app);
  firestore = getFirestore(app);
}

export { auth, firestore, collection, doc, getDoc, setDoc, updateDoc };