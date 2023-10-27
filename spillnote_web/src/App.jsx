import { onSnapshot, collection, } from 'firebase/firestore';
import './App.css'
import getFirestore from './Firebase';
import { useEffect, useState } from 'react';
import {handleEdit, handleNew, handleDelete, handleQueryDelete} from './util';

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
      <button className="className" onClick={handleNew}>Submit</button>
      <button className="className" onClick={handleQueryDelete}>Delete</button>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
           <textarea type="text" name="note" id="note" defaultValue={note.class}></textarea>
           <a onClick={() => handleEdit(note.id)}>edit</a>
           <button className="delete" onClick={() => handleDelete(note.id)}>
            delete
           </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
