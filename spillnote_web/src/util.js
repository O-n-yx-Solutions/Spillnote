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
import getFirestore from "Firebase";
import getAuth from "Firebase";

export const handleNew = async () => {
  const value = prompt("Enter a note");

  const collectionRef = collection(getFirestore, "notes");
  const payload = { class: value, timestamp: serverTimestamp() };

  await addDoc(collectionRef, payload);
};

export const handleEdit = async (id) => {
  const value = prompt("Edit note");

  const docRef = doc(getFirestore, "notes", id);
  const payload = { className: value, timestamp: serverTimestamp() };

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
