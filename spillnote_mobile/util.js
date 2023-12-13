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
  //creates a new note 

export const editDbText = async (id,text) => {
    console.log(`ID: ${id}, Text: ${text}`)

    const docRef = doc(db, "notes", id); 
    const payload = { content: text, timestamp: serverTimestamp() };
  
    updateDoc(docRef, payload);
  };
//edits the contents of a note
  
  export const fetchNotes = async (userEmail) => {
    try {
      if (userEmail) {
        const q = query(collection(db, "notes"), where("email", "==", userEmail));
        const querySnapshot = await getDocs(q);
        const notes = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));  

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
//gets all notes that belong to a specific user

