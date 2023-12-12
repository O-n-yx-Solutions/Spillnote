import { collection, addDoc } from "firebase/firestore";
import db from "../../firebase.js";

export default async function PushTag(
  email,
  selectedTag,
  nameEntry,
  tagColor,
  selectedIcon
) {
  const entry = {
    email: email,
    name: nameEntry,
    parents: selectedTag,
    iconcolor: tagColor,
    iconpath: selectedIcon,
  };

  try {
    const docRef = await addDoc(collection(db, "tags"), entry);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
