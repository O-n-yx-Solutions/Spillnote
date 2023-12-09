import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";

var firebaseConfig = {
  apiKey: "AIzaSyCnMQRkegXyhYe8cdfdOLNUHF2ciA6w_6g",
  authDomain: "spillnote-f2023.firebaseapp.com",
  databaseURL: "https://spillnote-f2023-default-rtdb.firebaseio.com",
  projectId: "spillnote-f2023",
  storageBucket: "spillnote-f2023.appspot.com",
  messagingSenderId: "301966407502",
  appId: "1:301966407502:web:2a4f9075431afc0bf5901f",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(firebaseApp);
