import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // ✅ Adicione isso

const firebaseConfig = {
  apiKey: "AIzaSyAPzeF30ExV6l4BaMDE5W6iy2rTyg63CFk",
  authDomain: "fire-fist-773ad.firebaseapp.com",
  projectId: "fire-fist-773ad",
  storageBucket: "fire-fist-773ad.firebasestorage.app",
  messagingSenderId: "934903500397",
  appId: "1:934903500397:web:1878da15a7417f576db964",
  measurementId: "G-6753Q5QW59",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // ✅ Criação do Firestore

export { auth, db }; // ✅ Exporte também o db
