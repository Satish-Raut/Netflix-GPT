// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYHEU5ED-WNFpuiKHM6kH7yQtPDLaXZJY",
  authDomain: "netflixgpt-1af2a.firebaseapp.com",
  projectId: "netflixgpt-1af2a",
  storageBucket: "netflixgpt-1af2a.firebasestorage.app",
  messagingSenderId: "871842714326",
  appId: "1:871842714326:web:05e3f664f3030093f6ef77",
  measurementId: "G-E72WMMYH36"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Auth
export const auth = getAuth();