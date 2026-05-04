import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCmQjYPnLTafRZM6jB0HYs2rtacjcYbAew",
  authDomain: "lms--auth.firebaseapp.com",
  projectId: "lms--auth",
  storageBucket: "lms--auth.firebasestorage.app",
  messagingSenderId: "97405816229",
  appId: "1:97405816229:web:5ab3b69713692b0f3dac4c",
  measurementId: "G-TVTMG2QTNP",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
