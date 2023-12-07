import {
  collection,
  addDoc,
  setDoc,
  doc,
  deleteDoc,
  query,
  where,
  getDocs,
  serverTimestamp,
  updateDoc,
  getFirestore,
} from "firebase/firestore";
import TextEditor from "./TextEditor";
//import { db } from "./firebase";
import { useAuth } from "./firebase";
import { useEffect, useState } from "react";

export const handleNew = async () => {
  const collectionRef = collection(getFirestore, "notes"); // leave same
  // HTML or React text area element
  const textContent = prompt("Enter a note");
  // FUntion to check on edit of texty area that sets the variables value and payload
  const payload = { className: textContent, timestamp: serverTimestamp() };
};
// same here ^^^
export const handleEdit = async (id) => {
  const docRef = doc(db, "notes", id); // leave same
  console.log(`DOC STUFF: ${docRef.notes}`);
  console.log("Hello there");

  const textContent = prompt("Edit note");

  const payload = { className: textContent, timestamp: serverTimestamp() };

  updateDoc(docRef, payload);
};

export const handleDelete = async (id) => {
  const docRef = doc(getFirestore, "notes", id);
  await deleteDoc(docRef);
};

export const handleQueryDelete = async () => {
  const userQInput = prompt("Enter a note");

  const collectionRef = collection(getFirestore, "notes");
  const q = query(collectionRef, where("className", "==", userQInput));
  const snapshot = await getDocs(q);

  const results = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

  console.log(results);

  results.forEach(async (result) => {
    const docRef = doc(getFirestore, "notes", result.id);
    await deleteDoc(docRef);
  });
};

export const fetchNotes = async (userEmail) => {
  try {
    if (userEmail) {
      const q = query(collection(db, "notes"), where("email", "==", userEmail));
      const querySnapshot = await getDocs(q);

      const notes = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("Fetched Notes:", notes); // Log all the results

      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } else {
      console.error("User email is undefined");
      return [];
    }
  } catch (error) {
    console.error("Error fetching notes:", error);
    throw error;
  }
};

export const db = getFirestore();
