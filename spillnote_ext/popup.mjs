import {
  getFirestore,
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";

import { db } from "./firebase.mjs";

document.addEventListener("DOMContentLoaded", function () {
  // Pre-templated note values
  var preTemplatedNote = {
    Title: "wassap",
    content: "<p>yo</p>",
    email: "john@gmail.com",
    timestamp: "2021-10-13T00:00:00",
  };

  // Get the current domain
  var domain = window.location.hostname;
  var enc_domain = btoa(domain);

  // Reference to the user's notes collection
  var userNotesCollection = collection(db, "notes");

  // Add the preTemplatedNote to the user's notes collection
  addDoc(userNotesCollection, preTemplatedNote)
    .then((docRef) => {
      console.log("Document added with ID:", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document:", error.message);
    });
});
