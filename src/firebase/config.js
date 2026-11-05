// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; 
import { getStorage } from "firebase/storage"; 

const firebaseConfig = {
  apiKey: "AIzaSyDw5IhsW4sZCqc5K_ajx8ci3X_Z35EQB24",
  authDomain: "://firebaseapp.com", // 👈 REVISÁ QUE QUEDE ASÍ (sin :// ni espacios)
  projectId: "bcd-tech",
  storageBucket: "bcd-tech.firebasestorage.app",
  messagingSenderId: "86135335088",
  appId: "1:86135335088:web:44106c3c0b73204176b375",
  measurementId: "G-3VSP3FQXE3"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Exportamos Firestore para guardar los textos y datos de los productos
export const db = getFirestore(app);

// Exportamos Storage para guardar los archivos físicos de tus imágenes
export const storage = getStorage(app); 
