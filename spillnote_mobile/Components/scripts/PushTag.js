import { collection, addDoc } from "firebase/firestore";
import db from "../../firebase.js";

export async function PushTag(
  email,
  selectedTag,
  nameEntry,
  tagColor,
  selectionIcon
) {
  const entry = [
    {
      email: email,
      name: nameEntry,
      parents: selectedTag,
      iconcolor: tagColor,
      iconpath: selectionIcon,
    },
  ];
  try {
    const docRef = await addDoc(collection(db, "tags"), {
      entry,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
