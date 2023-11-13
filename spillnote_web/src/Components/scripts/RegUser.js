import { collection, addDoc } from "firebase/firestore"; 
import db from "../../firebase.js"

export default async function RegUser()
{
    const entry =
    [{
            userFirstname: "Jason",
            userLastname: "Borne",
            email: "borne@jason.com"
    }]
    try 
    {
        const docRef = await addDoc(collection(db, "users"), 
        {
            entry
        });
        console.log("Document written with ID: ", docRef.id);
    } 
    catch (e) 
    {
        console.error("Error adding document: ", e);
    }
} 