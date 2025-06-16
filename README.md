# Sistema de Controle de Estoque e Vendas – Mercado Fácil

## 📘 Disciplina
Frameworks Modernos para Desenvolvimento de Sistemas – UNEMAT – Campus de Sinop

## 👥 Integrantes do Grupo
- Ariane Franco da Silva Pinto
- Miszleni Caroline Souza Sudre

## 🛠️ Tecnologias Utilizadas

**Front-end:**
- Vue.js 3 (Composition API)
- Vuetify
- Pinia
- Vue Router
- Firebase Authentication
- Chart.js

**Back-end:**
- Node.js com Express
- MySQL
- Firebase Admin (verificação de token)
- JWT via Firebase

## 💡 Descrição do Sistema

O sistema **Mercado Fácil** tem como objetivo simplificar o controle de estoque e vendas de pequenos comércios. Ele oferece funcionalidades como:

- Cadastro e login de usuários (com opção via Google)
- Registro de produtos e controle de estoque
- Registro de vendas e histórico detalhado
- Dashboard com visão geral e gráficos
- Tela de perfil para personalização dos dados do estabelecimento

## 📦 Estrutura do Projeto

📁 projeto-raiz/
├── frontend/
│ └── aplicação Vue.js com Vuetify e Firebase
├── backend/
│ └── API RESTful com Express.js, MySQL e Firebase Admin
└── README.md


## 🚀 Instruções para Executar

### 🖥️Front-end

```bash
cd frontend
npm install
npm run dev
```

### 🔧Back-end

```bash
cd backend
bun install
bun run index.js
```

> Certifique-se de configurar o arquivo `.env` corretamente no backend e o Firebase no front-end.
