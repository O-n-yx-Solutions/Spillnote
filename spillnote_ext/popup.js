document.addEventListener("DOMContentLoaded", function () {
  const firebaseConfig = {
    apiKey: "AIzaSyCnMQRkegXyhYe8cdfdOLNUHF2ciA6w_6g",

    authDomain: "spillnote-f2023.firebaseapp.com",

    databaseURL: "https://spillnote-f2023-default-rtdb.firebaseio.com",

    projectId: "spillnote-f2023",

    storageBucket: "spillnote-f2023.appspot.com",

    messagingSenderId: "301966407502",

    appId: "1:301966407502:web:2a4f9075431afc0bf5901f",
  };
  firebase.initializeApp(firebaseConfig);

  const openAuthPopup = () => {
    // Create a new window for authentication
    const authWindow = window.open(
      "firebase-auth.html",
      "authPopup",
      "width=400, height=600"
    );

    // Example: Sign in with Google
    const signInWithGoogle = async () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      try {
        const result = await firebase.auth().signInWithPopup(provider);
        console.log(result.user);
        // You can close the authentication popup if needed
        authWindow.close();
      } catch (error) {
        console.error(error);
      }
    };

    // Example: Sign out
    const signOut = async () => {
      try {
        await firebase.auth().signOut();
        console.log("Signed out");
      } catch (error) {
        console.error(error);
      }
    };

    // Attach click events to the buttons in the authentication popup
    authWindow.document
      .getElementById("signInButton")
      .addEventListener("click", signInWithGoogle);
    authWindow.document
      .getElementById("signOutButton")
      .addEventListener("click", signOut);
  };

  // Attach click event to the "Account" button
  document.getElementById("account").addEventListener("click", openAuthPopup);
});
