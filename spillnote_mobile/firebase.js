import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDocs, getDoc, collection, deleteDoc, query, where } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, deleteUser,initializeAuth, getReactNativePersistence } from 'firebase/auth';
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
        unsubscribe(); 
      });
    });
  };  //determines the current user in a way that works asynchronously

  export function useAuth() {
    const [currentUser, setCurrentUser] = useState();
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => setCurrentUser(user));
      return unsubscribe;
    }, []);
  
    return currentUser;
  } //determines the user in a way that does not seem to work asynchronously

  export async function signup(email, password, firstName, lastName) {
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
        firstName,
        lastName,
      });
  
      return user;
    } catch (error) {
      console.error('Signup failed:', error.message);
      throw error;
    }
  }; //creates a new user 
  
  export function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
      .catch((error) => {
        console.error('Login failed:', error.message);
        throw error; 
      });
  } //logs a user in

  export const deleteCurrentUserAccount = async (user) => {
    try {
      if (!user) {
        throw new Error('No user is currently signed in.');
      }
      const userEmail = user.email;
  
      await deleteCollection('events', 'email', userEmail);
      await deleteCollection('notes', 'email', userEmail);
      await deleteDoc(doc(collection(db, 'users'), userEmail));
      await deleteUser(user);
  
      console.log('User account successfully deleted.');
    } catch (error) {
      console.error('Error deleting user account:', error.message);
      throw error;
    }
  }; //deletes account
  
  async function deleteCollection(collectionName, fieldName, value) {
    const querySnapshot = await getDocs(query(collection(db, collectionName), where(fieldName, '==', value)));
    const deletePromises = [];
  
    querySnapshot.forEach((doc) => {
      deletePromises.push(deleteDoc(doc.ref));
    });
  
    await Promise.all(deletePromises);
  }
   //deletes an entire collection
export async function getUserInfo(user) {
  const usersCollection = collection(db, 'users');
  const userDoc = doc(usersCollection, user.email);
  
  try {
    const userSnapshot = await getDoc(userDoc);

    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();
      const firstName = userData.firstName;
      const lastName = userData.lastName;

      console.log('First Name:', firstName);
      console.log('Last Name:', lastName);

      return { firstName, lastName };
    } else {
      console.log('User document does not exist.');
      return null; 
    }
  } catch (error) {
    console.error('Error retrieving user information:', error);
    throw error; 
  }
} //gets first and last name of a user

export default db;
