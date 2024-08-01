// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6GeAEycJx8MIMMbameLsO8y0tvayxtT8",
  authDomain: "tria-52f4c.firebaseapp.com",
  projectId: "tria-52f4c",
  storageBucket: "tria-52f4c.appspot.com",
  messagingSenderId: "545688328268",
  appId: "1:545688328268:web:fdadc83e23ef104f647ce9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
