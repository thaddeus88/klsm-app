import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

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

// THESE TWO LINES ARE THE FIX:
export const db = getFirestore(app);
export const auth = getAuth(app);