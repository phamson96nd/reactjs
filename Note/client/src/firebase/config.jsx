// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4ChMuc_JXsAcq1zCaEPlMnNwFZb7VoIQ",
  authDomain: "note-app-7191b.firebaseapp.com",
  projectId: "note-app-7191b",
  storageBucket: "note-app-7191b.appspot.com",
  messagingSenderId: "126408581439",
  appId: "1:126408581439:web:ac0792aaece2e74142338a",
  measurementId: "G-570NKJC07W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);