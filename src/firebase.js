// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { initializeFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCaQRGMhpAncRq1KJNUGibGcwJ6VjFBWw",
  authDomain: "coptic-welfare.firebaseapp.com",
  projectId: "coptic-welfare",
  storageBucket: "coptic-welfare.firebasestorage.app",
  messagingSenderId: "993207771591",
  appId: "1:993207771591:web:5ae21601165454ab70f9e2",
  measurementId: "G-XN38QNR81R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = initializeFirestore(app, {
  databaseId: "welfare-db", 
});

