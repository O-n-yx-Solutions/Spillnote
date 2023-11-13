import { collection, addDoc } from "firebase/firestore";
import db from "../../firebase.js";

export default async function PushTag(
  usern,
  parentli,
  tagname,
  icocol,
  icopath
) {
  const entry = [
    {
      iconcolor: icocol,
      iconpath: icopath,
      name: tagname,
      parents: parentli,
      user: usern,
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
