// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvXunyRx_G_WfAperC6oLvSBPcFKXI4TI",
  authDomain: "the-memories-book-ffe23.firebaseapp.com",
  projectId: "the-memories-book-ffe23",
  storageBucket: "the-memories-book-ffe23.firebasestorage.app",
  messagingSenderId: "695658091500",
  appId: "1:695658091500:web:5f78701c75abe10db066c9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export default app;
