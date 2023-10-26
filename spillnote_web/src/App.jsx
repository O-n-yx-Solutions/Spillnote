import { onSnapshot, collection, addDoc } from 'firebase/firestore';
import './App.css'
import getFirestore from './Firebase';
import { useEffect, useState } from 'react';

function App() {

  const [notes, setNotes] = useState([{class: "Fetching Notes", id: "initial"}]);
  console.log(notes);
  useEffect(
    () =>
      onSnapshot(collection(getFirestore, "notes"), (snapshot) =>
        setNotes(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
    ), 
    []
  );

  const handleNew = async () => {
    const value = prompt("Enter a note");
    const collectionRef = collection(getFirestore, "notes");
    const payload = {class: value};
    await addDoc(collectionRef, payload);
  }

  return (
    <div className='root'>
      <button className="className" onClick={handleNew}>Submit</button>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            {note.class}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
