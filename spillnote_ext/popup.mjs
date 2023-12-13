import {
  getFirestore,
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";

import { db } from "./firebase.mjs";

document.addEventListener("DOMContentLoaded", function () {
  var preTemplatedNote = {
    Title: "Title",
    content: "<p>Note Contents</p>",
    email: "john@gmail.com",
    timestamp: "2021-10-13T00:00:00",
  };

  var userNotesCollection = collection(db, "notes");

  function createNote() {
    addDoc(userNotesCollection, preTemplatedNote)
      .then((docRef) => {
        console.log("Document added with ID:", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document:", error.message);
      });
  }

  var createButton = document.getElementById("create");
  if (createButton) {
    createButton.addEventListener("click", openNoteEditor);
  }

  function openNoteEditor() {
    const textArea = document.createElement("textarea");
    textArea.rows = 10;
    textArea.cols = 40;

    const saveButton = document.createElement("button");
    saveButton.innerText = "Save";
    saveButton.onclick = function () {
      const textContent = textArea.value;
      preTemplatedNote.content = textContent;
      createNote();
    };

    document.body.appendChild(textArea);
    document.body.appendChild(saveButton);
  }
});
//this file loads all the functionality into the extension when the DOM is loaded
//It adds a listener for the buttons including the functionality to create notes.