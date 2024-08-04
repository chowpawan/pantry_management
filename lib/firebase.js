// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5DnWTqoY5FJQuzzFtXQ4wq74DNhjKzPw",
  authDomain: "panty-management.firebaseapp.com",
  projectId: "panty-management",
  storageBucket: "panty-management.appspot.com",
  messagingSenderId: "1086698861793",
  appId: "1:1086698861793:web:c38400a9e03db6d79533a0",
  measurementId: "G-3J8LGHNV5V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };