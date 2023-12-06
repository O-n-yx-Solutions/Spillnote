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
  getFirestore,
} from "firebase/firestore";

chrome.runtime.onMessage.addListener(async function (
  request,
  sender,
  sendResponse
) {
  if (request.action === "handleNew") {
    try {
      // Call the handleNew function and log the payload
      const payload = await handleNew();
      console.log("New Note Payload:", payload);
    } catch (error) {
      console.error("Error handling new note in Content Script:", error);
    }
  }
});

const handleNew = async () => {
  const collectionRef = collection(getFirestore, "notes");
  const textContent = prompt("Enter a note");
  const payload = { className: textContent, timestamp: serverTimestamp() };
  return payload;
};
