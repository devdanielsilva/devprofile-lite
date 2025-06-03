import { createContext } from "react";
import { useAuth } from "../hooks/useAuth";
import React from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const auth = useAuth();

  if (auth.loading) {
    return <div>Carregando...</div>; // ou qualquer spinner bonito
  }

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
