import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { auth, db } from "../api/firebase";
import { setDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  async function register(email, password, name) {
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Salva os dados do usuário no Firestore, usando o UID como ID do documento
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: user.email,
        createdAt: new Date(),
      });

      setUser(user); // opcional: força o estado local
    } catch (error) {
      setError(error.message);
    }
  }

  async function login(email, password) {
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user); // força atualizar o estado local
      return true;
    } catch (error) {
      setError(error.message);
      return false;
    }
  }

  async function logout() {
    setError(null);
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      setError(error.message);
    }
  }

  return { user, loading, error, register, login, logout };
}
