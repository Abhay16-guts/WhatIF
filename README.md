# WhatIf AI — World Atlas

> Explore alternate realities through hypothetical questions.

A full-stack web application that turns "What if..." questions into structured, imaginative alternate realities — complete with timelines, impact analysis, short stories, and follow-up questions.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite + JavaScript |
| Styling | Tailwind CSS 3.4 + custom design tokens |
| Routing | React Router DOM |
| Animation | Framer Motion |
| Icons | Lucide React |
| Backend | Node.js + Express |
| AI | Google Gemini API (`@google/genai` SDK) |
| Validation | Zod |
| Persistence | Browser localStorage (MVP) |

## Prerequisites

- Node.js 18+ and npm
- A Google Gemini API key ([get one free](https://aistudio.google.com/apikey))

## Quick Start

### 1. Clone & install

```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

### 2. Configure environment

```bash
# Client
cp client/.env.example client/.env
# Edit VITE_API_BASE_URL if needed (default: http://localhost:3001/api)

# Server
cp server/.env.example server/.env
# Set your GEMINI_API_KEY in server/.env
```

### 3. Run locally

```bash
# Terminal 1 — Start backend
cd server
npm run dev

# Terminal 2 — Start frontend
cd client
npm run dev
```

Frontend: http://localhost:5173  
Backend health: http://localhost:3001/api/health

## Environment Variables

### Server (`server/.env`)

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `GEMINI_API_KEY` | Yes | — | Google Gemini API key |
| `GEMINI_MODEL` | Yes | `gemini-2.0-flash` | Model name |
| `PORT` | No | `3001` | Server port |
| `CLIENT_ORIGIN` | No | `http://localhost:5173` | CORS origin |
| `NODE_ENV` | No | `development` | Environment |
| `RATE_LIMIT_WINDOW_MS` | No | `60000` | Rate limit window |
| `RATE_LIMIT_MAX_REQUESTS` | No | `10` | Max requests per window |
| `REQUEST_TIMEOUT_MS` | No | `30000` | Request timeout |

### Client (`client/.env`)

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `VITE_API_BASE_URL` | Yes | `http://localhost:3001/api` | Backend API URL |

> ⚠️ Never put `GEMINI_API_KEY` in client-side environment variables.

## Scripts

### Client

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm test` | Run tests (Vitest) |
| `npm run lint` | Lint with ESLint |

### Server

| Command | Description |
|---------|-------------|
| `npm run dev` | Start with --watch |
| `npm start` | Production start |
| `npm test` | Run tests |
| `npm run lint` | Lint with ESLint |

## Project Structure

```
WhatIf AI/
├── client/                 # React + Vite frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Route pages
│   │   ├── hooks/          # Custom hooks
│   │   ├── utils/          # Utilities
│   │   ├── styles/         # Global styles & tokens
│   │   ├── test/           # Test setup
│   │   ├── App.jsx         # Router & layout
│   │   └── main.jsx        # Entry point
│   ├── .env.example
│   └── package.json
├── server/                 # Express API backend
│   ├── src/
│   │   ├── routes/         # API routes
│   │   ├── middleware/      # Express middleware
│   │   ├── config.js       # Centralized config
│   │   └── index.js        # Server entry
│   ├── .env.example
│   └── package.json
├── .gitignore
└── README.md
```

## Known Limitations

- MVP uses localStorage — no database or user accounts
- Gemini free tier has rate limits and quotas
- All generated content is fictional speculation

## License

Private project — not licensed for redistribution.

