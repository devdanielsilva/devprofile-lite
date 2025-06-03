import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const { register, error } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setSuccess(false);
    await register(email, password, name); // passando nome também

    if (!error) {
      setSuccess(true);
      setEmail("");
      setPassword("");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  }

  return (
    <div
      id="login"
      style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}
    >
      {/* ✅ Título acima do input de e-mail */}
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        DevProfile Lite
      </h1>

      <form onSubmit={handleSubmit}>
        <h2 style={{ color: "gray" }}>Tela de Cadastro</h2>
        <label>Nome</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>E-mail</label>
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

        <button type="submit" id="botaoCadastro">
          Cadastrar
        </button>

        <p>
          Já tem uma conta? <Link to="/login">Entre aqui</Link>
        </p>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && (
          <p style={{ color: "green" }}>
            Cadastro realizado com sucesso! Redirecionando...
          </p>
        )}
      </form>
    </div>
  );
}
