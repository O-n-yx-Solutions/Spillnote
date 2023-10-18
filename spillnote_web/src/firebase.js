// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
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
    appId: "1:301966407502:web:2a4f9075431afc0bf5901f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);