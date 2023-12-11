// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";

// const apiKey = process.env.REACT_APP_VITE_API_KEY;
// const authDomain = process.env.REACT_APP_VITE_AUTHDOMAIN;
// const messagingSenderId = process.env.REACT_APP_VITE_MESSAGINGSENDERID;
// const appId = process.env.REACT_APP_VITE_APPID;

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    databaseURL: "https://spillnote-f2023-default-rtdb.firebaseio.com",
    projectId: "spillnote-f2023",
    storageBucket: "spillnote-f2023.appspot.com",
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// console.log(db)

export function signup(email, password) {
    return auth().createUserWithEmailAndPassword(email, password);
  }
  
  export function login(email, password) {
    return auth().signInWithEmailAndPassword(email, password);
  }
  
  export function logout() {
    return auth().signOut();
  }
  
  // Custom Hook
  export function useAuth() {
    const [currentUser, setCurrentUser] = useState();
  
    useEffect(() => {
      const unsub = auth().onAuthStateChanged((user) => setCurrentUser(user));
      return unsub;
    }, []);
  
    return currentUser;
  }
  


export default db;

// import { initializeFirestore, initializeApp } from 'firebase/firestore';
// import { useEffect, useState } from 'react';
// import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';

// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_API_KEY,
//     authDomain: process.env.REACT_APP_AUTHDOMAIN,
//     databaseURL: "https://spillnote-f2023-default-rtdb.firebaseio.com",
//     projectId: "spillnote-f2023",
//     storageBucket: "spillnote-f2023.appspot.com",
//     messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
//     appId: process.env.REACT_APP_APPID
// };

// // Initialize Firebase
// // if (!auth.apps.length) {
//   auth.initializeApp(firebaseConfig);
// // }
// // Initialize Firebase
// // const app = initializeApp(firebaseConfig);
// // const db = getFirestore(app);
// // console.log(db)
// // export default db;

// // const db = firestore();

// export function signup(email, password) {
//   return auth().createUserWithEmailAndPassword(email, password);
// }

// export function login(email, password) {
//   return auth().signInWithEmailAndPassword(email, password);
// }

// export function logout() {
//   return auth().signOut();
// }

// // Custom Hook
// export function useAuth() {
//   const [currentUser, setCurrentUser] = useState();

//   useEffect(() => {
//     const unsub = auth().onAuthStateChanged((user) => setCurrentUser(user));
//     return unsub;
//   }, []);

//   return currentUser;
// }

// export default db;
