// src/pages/Login.jsx
import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const success = await login(email, password);

    if (success) {
      navigate("/profile");
    }
  }

  return (
    <div
      id="login"
      style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}
    >
      {/* ✅ Título acima do formulário */}
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        DevProfile Lite
      </h1>

      <form onSubmit={handleSubmit}>
        <h2 style={{ color: "gray" }}>Tela de Login</h2>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Senha</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" id="botaoEntrar">
          Entrar
        </button>

        <p>
          Não tem uma conta? <Link to="/register">Cadastre-se</Link>
        </p>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}
