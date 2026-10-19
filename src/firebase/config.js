// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Asegúrate de tener esta importación

const firebaseConfig = {
  apiKey: "AIzaSyDw5IhsW4sZCqc5K_ajx8ci3X_Z35EQB24",
  authDomain: "://firebaseapp.com",
  projectId: "bcd-tech",
  storageBucket: "bcd-tech.firebasestorage.app",
  messagingSenderId: "86135335088",
  appId: "1:86135335088:web:44106c3c0b73204176b375",
  measurementId: "G-3VSP3FQXE3"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ¡REVISA QUE TENGA LA PALABRA 'export' ADELANTE!
export const db = getFirestore(app); 
