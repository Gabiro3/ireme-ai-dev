// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGuOZ59edqhAxOfxOwJF6S1tlHc70731c",
  authDomain: "ireme-67849.firebaseapp.com",
  projectId: "ireme-67849",
  storageBucket: "ireme-67849.firebasestorage.app",
  messagingSenderId: "88654372349",
  appId: "1:88654372349:web:835b59d08f9d7cd49b4d94",
  measurementId: "G-QN2BH86907",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
