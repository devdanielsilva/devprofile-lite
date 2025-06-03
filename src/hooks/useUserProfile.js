// src/hooks/useUserProfile.js
import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../api/firebase";
import { useAuth } from "./useAuth";

export function useUserProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserProfile() {
      if (user) {
        try {
          const ref = doc(db, "users", user.uid);
          const snapshot = await getDoc(ref);

          if (snapshot.exists()) {
            setProfile(snapshot.data());
          } else {
            console.log("Perfil não encontrado no Firestore.");
          }
        } catch (error) {
          console.error("Erro ao buscar perfil:", error);
        }
      }
      setLoading(false);
    }

    fetchUserProfile();
  }, [user]);

  // ✅ Função para atualizar os dados do perfil no Firestore
  async function updateProfile(updates) {
    if (!user) return;
    try {
      const ref = doc(db, "users", user.uid);
      await updateDoc(ref, updates);
      setProfile((prev) => ({ ...prev, ...updates }));
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
    }
  }

  return { profile, loading, updateProfile };
}
