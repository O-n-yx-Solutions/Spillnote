import { onSnapshot, collection } from 'firebase/firestore';
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

  return (
    <div className='root'>
      <button className="className">Submit</button>
      <ul>
        {notes.map((note) => (
          <li key={notes.id}>
            {note.class}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
