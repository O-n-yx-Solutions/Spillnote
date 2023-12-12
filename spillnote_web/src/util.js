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
//import { db } from "./firebase";

export const handleNew = async (userEmail, title, textContent) => {
  try {
    const collectionRef = collection(db, "notes"); 
    const payload = { Title:title, content: textContent, email: userEmail, timestamp: serverTimestamp() };

    const docRef = await addDoc(collectionRef, payload);
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

export const handleEdit = async (id) => {
  const docRef = doc(db, "notes", id); // leave same
  console.log(`DOC STUFF: ${docRef.notes}`);
  console.log("Hello there");

  const textContent = prompt("Edit note");

  const payload = { className: textContent, timestamp: serverTimestamp() };

  updateDoc(docRef, payload);
};

export const editDbText = async (id, text) => {
  console.log(`ID: ${id}, Text: ${text}`);
  const docRef = doc(db, "notes", id); 

  const payload = { content: text, timestamp: serverTimestamp() };

  updateDoc(docRef, payload);
};
export const editNoteTags = async (id, tags) => {
  console.log(`ID: ${id}, Tags: ${tags}`);
  const docRef = doc(db, "notes", id); 

  const payload = { tags: tags, timestamp: serverTimestamp() };

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

export const removeNote = async (noteId) => {
  try {
    console.log(noteId);
    const docRef = doc(db, "notes", noteId);

    if (docRef) {
      await deleteDoc(docRef);
      console.log(`Note with ID ${noteId} successfully deleted.`);
    } else {
      console.log(`Note with ID ${noteId} not found.`);
    }
  } catch (error) {
    console.error("Error removing note:", error);
  }
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
export const fetchTags = async (userEmail) => {
  try {
    if (userEmail) {
      const q = query(collection(db, "tags"), where("email", "==", userEmail));
      const querySnapshot = await getDocs(q);

      const tags = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("Fetched Tags:", tags); // Log all the results

      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } else {
      console.error("User email is undefined");
      return [];
    }
  } catch (error) {
    console.error("Error fetching tags:", error);
    throw error;
  }
};

export const calendarEvent = async (calEvent) => {
  try {
    const newCallEvent = doc(collection(db,"events"))
    await setDoc(newCallEvent,calEvent)
    
    console.log('Event added to Firestore with ID:', newCallEvent.id);
  } catch (error) {
    console.error('Error adding event to Firestore:', error);
  }
};

export const getEventsByUserEmail = async (userEmail) => {
  try {
    if (userEmail) {
      const q = query(collection(db, "events"), where("email", "==", userEmail));
      const querySnapshot = await getDocs(q);

      const events = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("Fetched Events:", events); 

      return events;
    } else {
      console.error("User email is undefined");
      return [];
    }
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

export const removeEventFromDatabase = async (eventId, eventTitle) => {
  try {
    const eventsRef = collection(db, 'events');
    const queryRef = query(eventsRef, where('id', '==', eventId), where('title', '==', eventTitle));
    const querySnapshot = await getDocs(queryRef);

    if (querySnapshot.size === 0) {
      console.error(`No matching event found with ID ${eventId} and title ${eventTitle}`);
      return;
    }

    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
      console.log(`Event with ID ${eventId} and title ${eventTitle} deleted from the database`);
    });
  } catch (error) {
    console.error('Error deleting event from Firestore:', error);
    throw error;
  }
};



export const db = getFirestore();
