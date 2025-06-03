import React, { useState, useEffect } from "react";
import { useUserProfile } from "../hooks/useUserProfile";
import Header from "../components/Header";

export default function Profile() {
  const { profile, loading, updateProfile } = useUserProfile();
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [url, setUrl] = useState("");
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (profile) {
      setName(profile.name || "");
      setBio(profile.bio || "");
      setUrl(profile.url || "");
    }
  }, [profile]);

  if (loading) return <p>Carregando perfil...</p>;

  function isValidURL(string) {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  }

  async function handleSave(e) {
    e.preventDefault();

    if (url && !isValidURL(url)) {
      setMessage("URL inválida. Use o formato completo (ex: https://site.com)");
      return;
    }

    await updateProfile({ name, bio, url });
    setMessage("Perfil atualizado com sucesso!");
    setEditing(false);
    setTimeout(() => setMessage(""), 3000);
  }

  return (
    <>
      <Header /> {/* ✅ Cabeçalho com nome/email e botão de logout */}
      <div style={{ padding: "20px" }}>
        <h2>Perfil do Usuário</h2>

        {editing ? (
          <form onSubmit={handleSave}>
            <label>Nome:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label>Bio:</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
            />

            <label>URL:</label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://seusite.com"
            />

            <button type="submit">Salvar</button>
            <button type="button" onClick={() => setEditing(false)}>
              Cancelar
            </button>
          </form>
        ) : (
          <div>
            <p>
              <strong>Nome:</strong> {profile?.name || "Não informado"}
            </p>
            <p>
              <strong>Email:</strong> {profile?.email || "Não informado"}
            </p>
            <p>
              <strong>Bio:</strong> {profile?.bio || "Não informada"}
            </p>
            <p>
              <strong>URL:</strong>{" "}
              {profile?.url ? (
                <a href={profile.url} target="_blank" rel="noopener noreferrer">
                  {profile.url}
                </a>
              ) : (
                "Não informada"
              )}
            </p>
            <button onClick={() => setEditing(true)} id="botaoEditar">
              Editar
            </button>
          </div>
        )}

        {message && (
          <p style={{ color: message.includes("inválida") ? "red" : "green" }}>
            {message}
          </p>
        )}
      </div>
    </>
  );
}
