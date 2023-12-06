import { collection, addDoc } from "firebase/firestore";
import db from "../../firebase.js";

export default async function PushTag(
  usertag,
  selectedTag,
  nameEntry,
  tagColor,
  selectionIcon
) {
  const entry = [
    {
      user: usertag,
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
