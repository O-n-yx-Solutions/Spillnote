import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc, collection} from "firebase/firestore";
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

export async function signup(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const usersCollection = collection(db, 'users');
    const existingUserDoc = await getDoc(doc(usersCollection, email));

    if (existingUserDoc.exists()) {
      throw new Error('User with this email already exists.');
    }

    const userDocRef = doc(usersCollection, email);
    await setDoc(userDocRef, {
      email: user.email,
      password,
    });

    return user;
  } catch (error) {
    console.error('Signup failed:', error.message);
    throw error;
  }
};

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
