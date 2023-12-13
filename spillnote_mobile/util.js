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
  getFirestore } from 'firebase/firestore';
  import db from './firebase.js';


  export const handleNew = async (userEmail, title, textContent, deltaContent) => {
    try {
      const collectionRef = collection(db, "notes"); 
      const contentString = typeof textContent === 'string' ? textContent : '';
      const payload = {
        Title:title,
        content: contentString,
        email: userEmail,
        timestamp: serverTimestamp(),
        deltaContent: deltaContent
      };
  
      const docRef = await addDoc(collectionRef, payload);
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

export const handleEdit = async(id) => {
    const value = prompt("Edit note");

    const docRef = doc(db, "notes", id);
    const payload = { class: value, timestamp: serverTimestamp() };

    await updateDoc(docRef, payload);
};

export const editDbText = async (id,text) => {
    console.log(`ID: ${id}, Text: ${text}`)

    const docRef = doc(db, "notes", id); // leave same
   
    const payload = { content: text, timestamp: serverTimestamp() };
  
    updateDoc(docRef, payload);
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
  
        // console.log("Fetched Notes:", notes); // Log all the results
  
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

export const handleDelete = async(id) => {
    const docRef = doc(db, "notes", id);
    await deleteDoc(docRef);
};

export const handleQueryDelete = async() => {
    const userQInput = prompt("Enter a note");

    const collectionRef = collection(db, "notes");
    const q = query(collectionRef, where("class", "==", userQInput));
    const snapshot = await getDocs(q);

    const results = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id }));

    console.log(results);

    results.forEach(async result => {
        const docRef = doc(db, "notes", result.id);
        await deleteDoc(docRef);
    })
};
