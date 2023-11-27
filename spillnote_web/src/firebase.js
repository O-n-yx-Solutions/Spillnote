// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// // const apiKey = process.env.REACT_APP_VITE_API_KEY;
// // const authDomain = process.env.REACT_APP_VITE_AUTHDOMAIN;
// // const messagingSenderId = process.env.REACT_APP_VITE_MESSAGINGSENDERID;
// // const appId = process.env.REACT_APP_VITE_APPID;

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: import.meta.env.REACT_APP_VITE_API_KEY,
//     authDomain: import.meta.env.REACT_APP_VITE_AUTHDOMAIN,
//     databaseURL: "https://spillnote-f2023-default-rtdb.firebaseio.com",
//     projectId: "spillnote-f2023",
//     storageBucket: "spillnote-f2023.appspot.com",
//     messagingSenderId: import.meta.env.REACT_APP_VITE_MESSAGINGSENDERID,
//     appId: import.meta.env.REACT_APP_VITE_APPID
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// const auth = getAuth(app);

// console.log(db)

// export default db;
// export function signup(email, password){
//     return createUserWithEmailAndPassword(auth, email, password);
// }

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCnMQRkegXyhYe8cdfdOLNUHF2ciA6w_6g",
  authDomain: "spillnote-f2023.firebaseapp.com",
  databaseURL: "https://spillnote-f2023-default-rtdb.firebaseio.com",
  projectId: "spillnote-f2023",
  storageBucket: "spillnote-f2023.appspot.com",
  messagingSenderId: "301966407502",
  appId: "1:301966407502:web:2a4f9075431afc0bf5901f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export function signup(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logout() {
  return signOut(auth);
}

// Custom Hook
export function useAuth() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
    return unsub;
  }, []);

  return currentUser;
}

export default db;
