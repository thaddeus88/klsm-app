// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCg7JF2MVE76XmTe78YohYL528-myxmUcw",
  authDomain: "klsm-workplace-inspection-hub.firebaseapp.com",
  projectId: "klsm-workplace-inspection-hub",
  storageBucket: "klsm-workplace-inspection-hub.firebasestorage.app",
  messagingSenderId: "240176737595",
  appId: "1:240176737595:web:f8f03a7b2f94a6fe5f9b1e",
  measurementId: "G-HXXK9GH568"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);