# devprofile-lite

Autenticação e Visualização de Perfil com React e Firebase

**informações detalhadas sobre o arquivo `firebase.js`**, incluindo o trecho de código e explicações sobre cada parte.

---

````markdown
# 📘 Documentação de Arquivos – DevProfile Lite

Este projeto é uma aplicação React integrada com Firebase, permitindo autenticação de usuários e gerenciamento de perfis.

---

## 📄 Arquivos e Descrição

### 1. `Register.jsx` – _Página de Cadastro_

Permite que novos usuários criem uma conta informando nome, e-mail e senha. Após o cadastro, o usuário é salvo no Firestore e redirecionado para a tela de login.

---

### 2. `Login.jsx` – _Página de Login_

Tela para usuários existentes entrarem no sistema com email e senha. Ao logar com sucesso, o usuário é redirecionado para a tela de perfil.

---

### 3. `Profile.jsx` – _Página de Perfil do Usuário_

Permite visualizar e editar os dados do usuário autenticado, incluindo nome, bio e URL pessoal. Os dados são carregados e atualizados diretamente do Firestore.

---

### 4. `useUserProfile.js` – _Hook de Perfil do Usuário_

Carrega os dados do perfil do Firestore com base no UID do usuário logado e oferece uma função para atualizar esses dados (`updateProfile`).

---

### 5. `useAuth.js` – _Hook de Autenticação_

Centraliza a lógica de autenticação com Firebase:

- `register(email, password, name)`
- `login(email, password)`
- `logout()`
- Monitora o estado global de autenticação com `onAuthStateChanged`.

---

### 6. `AuthContext.jsx` – _Contexto Global_

Fornece o hook `useAuth()` via Context API, permitindo acesso ao estado de autenticação em qualquer componente filho.

---

### 7. `Header.jsx` – _Cabeçalho_

Mostra o e-mail do usuário logado e fornece um botão de logout, que encerra a sessão e redireciona para a tela de login.

---

### 8. `PrivateRoute.jsx` – _Rota Protegida_

Garante que somente usuários autenticados possam acessar páginas restritas. Redireciona usuários não logados para `/login`.

---

### 9. `firebase.js` – _Configuração do Firebase_

**Arquivo essencial** que inicializa os serviços do Firebase na aplicação, como autenticação e Firestore.

#### 📦 Conteúdo do arquivo:

```js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // ✅ Adicione isso

const firebaseConfig = {
  apiKey: "AIzaSyAPzeF30ExV6l4BaMDE5W6iy2rTyg63CFk",
  authDomain: "fire-fist-773ad.firebaseapp.com",
```
````
