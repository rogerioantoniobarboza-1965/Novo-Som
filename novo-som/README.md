# 🎵 Novo Som

Gerenciador pessoal de músicas e aulas de guitarra do YouTube.
Interface noturna com glassmorphism, animações suaves e player embutido.

---

## Funcionalidades

| | |
|---|---|
| ➕ **Adicionar** | Vídeos do YouTube com título, artista e tipo |
| 🎬 **Assistir** | Player embutido (iframe) ao clicar no card |
| 🔍 **Filtrar** | Busca por título/artista + abas Músicas / Aulas |
| ❌ **Remover** | Modo gerenciamento com botão × em cada card |
| 💾 **Backup** | Baixa `.html` standalone com todos os dados |
| 📱 **Responsivo** | Mobile-first, tablet e desktop |

---

## Stack

- **React 19** + **Vite 6**
- **Framer Motion** — animações
- **localStorage** — persistência
- **Space Grotesk + Inter** — tipografia

---

## Instalação Local

```bash
git clone https://github.com/SEU_USUARIO/novo-som.git
cd novo-som
npm install
npm run dev
# → http://localhost:5173
```

---

## Deploy no GitHub Pages

**1. Ajuste `vite.config.js`** com o nome do seu repositório:
```js
base: '/nome-do-seu-repo/',
```

**2. Rode o deploy:**
```bash
npm run deploy
```

**3. Ative o Pages** em Settings → Pages → branch `gh-pages`.

Seu site: `https://SEU_USUARIO.github.io/novo-som/`

---

## Estrutura

```
src/
├── components/   Header, FilterBar, VideoGrid, VideoCard,
│                 AddModal, PlayerModal, EmptyState
├── hooks/        usePlaylist.js  (localStorage)
├── utils/        youtubeUtils.js · backupUtils.js
├── styles/       globals.css  (design system completo)
├── App.jsx
└── main.jsx
```

---

## Links YouTube Suportados

```
https://youtube.com/watch?v=ID
https://youtu.be/ID
https://youtube.com/shorts/ID
https://youtube.com/embed/ID
```
