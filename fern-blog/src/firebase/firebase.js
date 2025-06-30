// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth ,GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALZrK-xpfN0WeWzw3Fs43ccnaKpMnCdUE",
  authDomain: "myblog-50a8c.firebaseapp.com",
  projectId: "myblog-50a8c",
  storageBucket: "myblog-50a8c.firebasestorage.app",
  messagingSenderId: "739217553722",
  appId: "1:739217553722:web:7068a900f0385d1d67b803",
  measurementId: "G-CES0SK9HWS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();