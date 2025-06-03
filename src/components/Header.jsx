// src/components/Header.jsx
import React from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        background: "#282c34",
        color: "#fff",
      }}
    >
      <div>
        <strong>Bem-vindo{user?.email ? `, ${user.email}` : ""}</strong>
      </div>
      <button
        onClick={handleLogout}
        style={{ padding: "0px 20px" }}
        id="botaoSair"
      >
        Logout
      </button>
    </header>
  );
}
