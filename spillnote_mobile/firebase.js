import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';

import { useEffect, useState } from "react";

import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';




export const firebaseConfig = {
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
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

  export function logout() {
    return auth().signOut();
  }

  export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          resolve(user);
        } else {
          reject(new Error('No user is currently logged in.'));
        }
        unsubscribe(); // Make sure to unsubscribe to avoid memory leaks
      });
    });
  };

  // Custom Hook
  export function useAuth() {
    const [currentUser, setCurrentUser] = useState();
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => setCurrentUser(user));
      return unsubscribe;
    }, []);
  
    return currentUser;
  }

  export function signup(email, password) {
    //const auth = getAuth(); // Get the Auth instance
    return createUserWithEmailAndPassword(auth, email, password)
      .catch((error) => {
        console.error('Signup failed:', error.message);
        throw error; // Rethrow the error to propagate it to the caller
      });
  }
  
  export function login(email, password) {
    // const auth = getAuth(); // Get the Auth instance
    return signInWithEmailAndPassword(auth, email, password)
      .catch((error) => {
        console.error('Login failed:', error.message);
        throw error; // Rethrow the error to propagate it to the caller
      });
  }
  

export default db;
