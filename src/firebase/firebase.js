import firebase from "firebase/app";
import "firebase/auth"; 
import "firebase/firestore"; 

const firebaseConfig = {
    apiKey: process.env.VUE_APP_firebase_api,
    authDomain: "newblogapp-9fae6.firebaseapp.com",
    projectId: process.env.VUE_APP_projectId,
    storageBucket: "newblogapp-9fae6.appspot.com",
    messagingSenderId: "254225548616",
    appId: process.env.VUE_APP_appId,
    measurementId: "G-LEBB48CFPN"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Export Firebase services
const auth = firebase.auth();
const db= firebase.firestore();


var provider = new firebase.auth.GoogleAuthProvider();

export { firebase, auth, db,provider };
