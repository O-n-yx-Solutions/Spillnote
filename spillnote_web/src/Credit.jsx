import { onSnapshot, collection } from "firebase/firestore";
import getFirestore from "./Firebase";
import { useEffect, useState } from "react";
import { handleEdit, handleNew, handleDelete, handleQueryDelete } from "./util";
import TextEditor from "./TextEditor";

export default function Credit(noteid) {
  if (noteid != null) {
    //edit
    {
      handleEdit(noteid);
    }
  } else {
    //create
    {
      handleNew(noteid);
    }
  }

  const [text, setText] = useState("");

  const handleInputChange = (event) => {
    setText(event.target.value);
    // Perform any actions you want when the content of the textarea changes
  };

  //   const [notes, setNotes] = useState([
  //     { class: "Fetching Notes", id: "initial" },
  //   ]);
  //   console.log(notes);
  //   useEffect(
  //     () =>
  //       onSnapshot(collection(getFirestore, "notes"), (snapshot) =>
  //         setNotes(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  //       ),
  //     []
  //   );

  //   return (
  //     <div className="root">
  //       <button className="className" onClick={handleNew}>
  //         Submit
  //       </button>
  //       <button className="className" onClick={handleQueryDelete}>
  //         Delete
  //       </button>
  //       <ul>
  //         {notes.map((note) => (
  //           <li key={note.id}>
  //             <textarea
  //               onClick={() => handleEdit(note.id)}
  //               cols="20"
  //               rows="15"
  //               placeholder={note.class}
  //             ></textarea>
  //             <a onClick={() => handleEdit(note.id)}>Edit</a>
  //             <button className="delete" onClick={() => handleDelete(note.id)}>
  //               delete
  //             </button>
  //           </li>
  //         ))}
  //       </ul>
  //     </div>
  //   );
  // }

  return <TextEditor />;
}
