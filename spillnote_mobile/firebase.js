import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDocs, getDoc, collection, deleteDoc, query, where } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, deleteUser } from 'firebase/auth';

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
    return signOut(auth);
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

  export async function signup(email, password, firstName, lastName) {
    try {
      // Create a new user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  
      // Access the user object from the user credential
      const user = userCredential.user;
  
      // Check if a user document already exists with the same email
      const usersCollection = collection(db, 'users');
      const existingUserDoc = await getDoc(doc(usersCollection, email));
  
      if (existingUserDoc.exists()) {
        // User with the same email already exists, handle accordingly (throw an error, update the existing user, etc.)
        throw new Error('User with this email already exists.');
      }
  
      // Create a user document in Firestore with the email as the document ID
      const userDocRef = doc(usersCollection, email);
      await setDoc(userDocRef, {
        email: user.email,
        password, // Note: Storing passwords in plaintext is not recommended for a real application
        firstName,
        lastName,
      });
  
      return user;
    } catch (error) {
      console.error('Signup failed:', error.message);
      throw error;
    }
  };
  
  export function login(email, password) {
    // const auth = getAuth(); // Get the Auth instance
    return signInWithEmailAndPassword(auth, email, password)
      .catch((error) => {
        console.error('Login failed:', error.message);
        throw error; // Rethrow the error to propagate it to the caller
      });
  }

  export const deleteCurrentUserAccount = async (user) => {
    try {
      if (!user) {
        throw new Error('No user is currently signed in.');
      }
  
      // Get the user's email
      const userEmail = user.email;
  
      // Delete events associated with the user
      await deleteCollection('events', 'email', userEmail);
  
      // Delete notes associated with the user
      await deleteCollection('notes', 'email', userEmail);
  
      // Delete the user document itself
      await deleteDoc(doc(collection(db, 'users'), userEmail));
  
      // Finally, delete the user account
      await deleteUser(user);
  
      console.log('User account successfully deleted.');
    } catch (error) {
      console.error('Error deleting user account:', error.message);
      throw error;
    }
  };
  
  async function deleteCollection(collectionName, fieldName, value) {
    const querySnapshot = await getDocs(query(collection(db, collectionName), where(fieldName, '==', value)));
    const deletePromises = [];
  
    querySnapshot.forEach((doc) => {
      deletePromises.push(deleteDoc(doc.ref));
    });
  
    await Promise.all(deletePromises);
  }
  


export async function getUserInfo(user) {
  const usersCollection = collection(db, 'users');
  const userDoc = doc(usersCollection, user.email);
  
  try {
    const userSnapshot = await getDoc(userDoc);

    if (userSnapshot.exists()) {
      // Access the data from the user document
      const userData = userSnapshot.data();
      
      // Assuming your user document has fields 'firstName' and 'lastName'
      const firstName = userData.firstName;
      const lastName = userData.lastName;

      // Now you can use firstName and lastName as needed
      console.log('First Name:', firstName);
      console.log('Last Name:', lastName);

      return { firstName, lastName };
    } else {
      console.log('User document does not exist.');
      return null; // or handle accordingly
    }
  } catch (error) {
    console.error('Error retrieving user information:', error);
    throw error; // Handle the error as needed
  }
}

export default db;
