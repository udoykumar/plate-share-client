// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCh5O1EB1cgroQQNvJcsrHKYx1YFqkICL8",
  authDomain: "plate-sharing.firebaseapp.com",
  projectId: "plate-sharing",
  storageBucket: "plate-sharing.firebasestorage.app",
  messagingSenderId: "27703638761",
  appId: "1:27703638761:web:1f7d41f7b7fb55f238ce78",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);