import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAtpuIdKORbnrOo7PgboelufqGuk0tfYvk",
  authDomain: "mychat-9fd31.firebaseapp.com",
  projectId: "mychat-9fd31",
  storageBucket: "mychat-9fd31.appspot.com",
  messagingSenderId: "1027647712474",
  appId: "1:1027647712474:web:f53db6e007ed3506d0c9e3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut };

