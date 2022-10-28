// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAD07JbaE-vBkSla95VZh9bHqPnl13aX0Y",
  authDomain: "jackiesfinancialtracker.firebaseapp.com",
  projectId: "jackiesfinancialtracker",
  storageBucket: "jackiesfinancialtracker.appspot.com",
  messagingSenderId: "40852702905",
  appId: "1:40852702905:web:08da3c76311f7ae30cfd68"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export  {getAuth,db}