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

  // Reference to the user's notes collection
  var userNotesCollection = collection(db, "notes");

  // Add the preTemplatedNote to the user's notes collection
  function createNote() {
    // Add the preTemplatedNote to the user's notes collection
    addDoc(userNotesCollection, preTemplatedNote)
      .then((docRef) => {
        console.log("Document added with ID:", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document:", error.message);
      });
  }

  // Event listener for the "Create Note" button
  var createButton = document.getElementById("create");
  if (createButton) {
    createButton.addEventListener("click", openNoteEditor);
  }

  // Function to open a simple text editor
  function openNoteEditor() {
    // Replace this with your own UI for a text editor
    const textArea = document.createElement("textarea");
    textArea.rows = 10;
    textArea.cols = 40;

    const saveButton = document.createElement("button");
    saveButton.innerText = "Save";
    saveButton.onclick = function () {
      const textContent = textArea.value;
      preTemplatedNote.content = textContent;

      // Call the function to create a note in the database
      createNote();

      // Close the text editor or handle UI as needed
    };

    document.body.appendChild(textArea);
    document.body.appendChild(saveButton);
  }
});
