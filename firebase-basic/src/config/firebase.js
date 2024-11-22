// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAyjlbp05nB7tp6RqCVGBYeHMAKcIOK5ys",
  authDomain: "fir-frontend-61ec3.firebaseapp.com",
  projectId: "fir-frontend-61ec3",
  storageBucket: "fir-frontend-61ec3.firebasestorage.app",
  messagingSenderId: "587722651324",
  appId: "1:587722651324:web:b9119fd92c2bcfaca702b9",
  measurementId: "G-25JFS7QP4R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);