import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { 
    getFirestore, 
    collection, 
    addDoc, 
    getDocs, 
    onSnapshot, 
    deleteDoc, // Agrega deleteDoc
    doc, // Agrega doc
    updateDoc, // Agrega updateDoc
    serverTimestamp 
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";
import { 
    getAuth, 
    onAuthStateChanged, 
    signOut, 
    signInWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDppBzhbYEbvojVSlynVK4RgZgkmXRzyYY",
  authDomain: "mb-estudio-de-belleza.firebaseapp.com",
  projectId: "mb-estudio-de-belleza",
  storageBucket: "mb-estudio-de-belleza.firebasestorage.app",
  messagingSenderId: "918025008393",
  appId: "1:918025008393:web:f2c3017629b7d2a4310fd8"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Exporta las funciones necesarias
export { 
    db, 
    auth, 
    collection, 
    addDoc, 
    getDocs, 
    onSnapshot, 
    deleteDoc, // Exporta deleteDoc
    doc, // Exporta doc
    updateDoc, // Exporta updateDoc
    serverTimestamp, 
    onAuthStateChanged, 
    signOut,
    signInWithEmailAndPassword 
};
