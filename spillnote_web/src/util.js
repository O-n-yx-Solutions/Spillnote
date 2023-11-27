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
} from "firebase/firestore";
import getFirestore from "./firebase";
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
  const docRef = doc(getFirestore, "notes", id); // leave same

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

export const fetchNotes = (userEmail) => {
  const db = getFirestore();
  try {
    const q = query(collection(db, "notes"), where("email", "==", userEmail));
    const querySnapshot = getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching notes:", error);
    throw error;
  }
};

export default fetchNotes;
