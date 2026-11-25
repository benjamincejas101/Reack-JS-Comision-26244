// src/context/AuthContext.jsx
import { createContext, useState, useContext, useEffect } from "react";
import { db } from '../firebase/config';
import { doc, getDoc, setDoc } from "firebase/firestore"; // <-- Agregamos setDoc
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(); 
  
  // Función para registrar un nuevo usuario y guardar su rol en Firestore
  const signup = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const nuevoUsuario = userCredential.user;

    // Creamos su documento en la colección "usuarios" con rol "user"
    await setDoc(doc(db, "usuarios", nuevoUsuario.uid), {
      email: nuevoUsuario.email,
      rol: "user",
      fechaRegistro: new Date().toISOString()
    });

    return userCredential;
  };
  
  // Función para iniciar sesión
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  
  // Función para cerrar sesión
  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userDocRef = doc(db, "usuarios", currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists() && userDocSnap.data().rol === "admin") {
          setUser({ ...currentUser, rol: "admin" });
        } else {
          setUser({ ...currentUser, rol: "user" });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [auth]); 
  
  const value = {
    user,
    loading, 
    signup,
    login, 
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

