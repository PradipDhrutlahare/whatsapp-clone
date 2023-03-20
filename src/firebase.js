
// import  firebase from "firebase/compat/app";
import {getFirestore} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAzWc4OhMU4f429PC_DpNnrnhU6QeM0TCc",
  authDomain: "whats-app-clone-7ebfe.firebaseapp.com",
  projectId: "whats-app-clone-7ebfe",
  storageBucket: "whats-app-clone-7ebfe.appspot.com",
  messagingSenderId: "461014505821",
  appId: "1:461014505821:web:319d7fdb9749e04176b0b4",
  measurementId: "G-KDWPPLEF3T"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app);
const provider = new GoogleAuthProvider();


export{auth, provider}
export default db;


// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


//npm install firebase

 //Install Firebase cli
// npm install -g firebase-tools
//const db = getFirestore(app)

// Deploy to Firebase Hosting
// firebase login
// firebase init
// firebase deploy


