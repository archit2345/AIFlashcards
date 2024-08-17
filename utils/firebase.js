// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);