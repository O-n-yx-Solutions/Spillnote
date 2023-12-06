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
console.log(db)
export default db;