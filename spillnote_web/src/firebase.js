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
