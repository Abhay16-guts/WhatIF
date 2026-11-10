# WHATIF / WORLD ATLAS (WhatIf AI)

> **A responsive counterfactual exploration platform and speculative thought experiment engine.**

WhatIf AI turns hypothetical questions (*"What if humans never needed sleep?"*, *"What if the Library of Alexandria never burned?"*) into structured, imaginative, and internally coherent alternate realities.

Built with an **editorial magazine / speculative world atlas** aesthetic—featuring warm paper textures, deep ink typography, restrained motion, and rigorous causal frameworks rather than generic purple AI dashboard tropes.

---

## Architecture & Visual Overview

```
                                  +------------------------------------+
                                  |     Vite / React 18 Frontend       |
                                  |   (Tailwind 3.4 + Framer Motion)   |
                                  +-----------------+------------------+
                                                    |
                                      VITE_API_BASE_URL (REST)
                                                    |
                                                    v
                                  +-----------------+------------------+
                                  |        Express.js Backend          |
                                  |  (Helmet + RateLimit + Zod Schema) |
                                  +-----------------+------------------+
                                                    |
                                          @google/genai SDK
                                           (Server-side only)
                                                    |
                                                    v
                                  +-----------------+------------------+
                                  |      Google Gemini API             |
                                  |  (Configurable: GEMINI_MODEL)      |
                                  +------------------------------------+
```

### Core Features

- **Prompt Synthesis Composer**: Character-counted input (10–500 chars), tone selector (*Thoughtful, Scientific, Cinematic, Playful*), and temporal horizon scale (*10, 50, 100 years*).
- **Structured Multiverse Dossier**:
  - **Divergence Point & §-Numbered Assumptions**: Explicit boundary conditions.
  - **Chronological Timeline Rail**: Milestones across decades.
  - **5-Dimensional Impact Matrix**: *Society, Economy, Technology, Environment, Culture*.
  - **Speculative Short Story**: An evocative human vignette set inside the world.
  - **Grounded Follow-Up Inquiries**: Ask deeper questions rooted in established timeline rules.
- **Local Storage Library**: Persistent versioned storage (`whatif:history:v1`) with search, filter, and confirmation-guarded deletion.
- **Multiverse Juxtaposition (Comparison)**: Side-by-side comparative analysis of two saved timelines on desktop, cleanly stacked on mobile.
- **Editorial Design System**: Warm ivory/paper palette, oversized serif headlines, focus-visible states, accessible live-region toasts, and `prefers-reduced-motion` compliance.

---

## Tech Stack

| Layer | Technology | Choice Rationale |
|-------|------------|------------------|
| **Frontend** | React 18 + Vite | Fast HMR, clean modern client architecture |
| **Styling** | Tailwind CSS 3.4.x | Stable v3 PostCSS setup, custom CSS tokens |
| **Icons** | Lucide React | Clean, lightweight editorial iconography |
| **Animation** | Framer Motion | Restrained micro-interactions with reduced-motion fallbacks |
| **Routing** | React Router DOM v6 | Full SPA navigation with route-aware instant scroll-to-top |
| **Backend** | Node.js + Express | Lightweight, reliable REST server |
| **AI SDK** | `@google/genai` | Official Google Gen AI JavaScript SDK with structured JSON schemas |
| **Validation** | Zod | End-to-end schema validation on client and server |
| **Security** | Helmet, CORS, express-rate-limit | Strict headers, origin filtering, and request throttling |
| **Testing** | Vitest + RTL (Client), Node Test Runner (Server) | Fast, modern, zero-bloat test suites |

---

## Monorepo Project Structure

```
WhatIf AI/
├── client/                          # React + Vite frontend
│   ├── public/
│   │   └── _redirects              # Netlify/SPA route fallback
│   ├── src/
│   │   ├── components/             # Reusable UI components
│   │   │   ├── AssumptionsList.jsx # Divergence & assumptions grid
│   │   │   ├── AtlasMethodology.jsx# 4-stage system of inquiry
│   │   │   ├── ConfirmDialog.jsx   # Accessible focus-trapped dialog
│   │   │   ├── CopyButton.jsx      # Clipboard API with fallback
│   │   │   ├── FeaturedScenario.jsx# Static showcase demo dossier
│   │   │   ├── FollowUpComposer.jsx# Grounded Q&A dispatch interface
│   │   │   ├── Footer.jsx          # Semantic footer & legal notice
│   │   │   ├── GenerationStatus.jsx# Rotating status messages
│   │   │   ├── HomeHero.jsx        # Editorial hero & prompt preview
│   │   │   ├── ImpactGrid.jsx      # 5-dimension impact matrix
│   │   │   ├── ScenarioHeader.jsx  # Dossier actions & metadata
│   │   │   ├── ScrollToTop.jsx     # Route-aware scroll reset
│   │   │   ├── SiteHeader.jsx      # Accessible responsive navigation
│   │   │   ├── StoryPanel.jsx      # Dark contrast speculative vignette
│   │   │   └── TimelineRail.jsx    # Chronological timeline rail
│   │   ├── context/
│   │   │   └── ToastContext.jsx    # Accessible live-region notifications
│   │   ├── hooks/
│   │   │   └── useToast.js         # Toast consumption hook
│   │   ├── pages/
│   │   │   ├── Compare.jsx         # Two-scenario comparison
│   │   │   ├── Create.jsx          # Inquiry composer workspace
│   │   │   ├── History.jsx         # Saved scenario library
│   │   │   ├── Home.jsx            # Editorial atlas magazine landing
│   │   │   ├── NotFound.jsx        # Custom 404 page
│   │   │   └── ScenarioDetail.jsx  # Full scenario dossier view
│   │   ├── styles/
│   │   │   └── index.css           # Design tokens, reset, paper texture
│   │   ├── test/                   # Vitest unit & integration tests
│   │   ├── utils/
│   │   │   ├── api.js              # Centralized API client
│   │   │   ├── constants.js        # Prompts and configuration
│   │   │   ├── mockData.js         # Archetype scenarios
│   │   │   └── storage.js          # Defensive localStorage manager
│   │   ├── App.jsx                 # Routes & layout shell
│   │   └── main.jsx                # DOM entry point
│   ├── vercel.json                 # Vercel SPA rewrite rule
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
├── server/                          # Express backend
│   ├── src/
│   │   ├── middleware/
│   │   │   └── errorHandler.js     # Safe user-facing error handler
│   │   ├── routes/
│   │   │   ├── health.js           # GET /api/health
│   │   │   └── scenarios.js        # POST /generate & POST /follow-up
│   │   ├── schemas/
│   │   │   └── scenarioSchemas.js  # Server Zod & JSON schemas
│   │   ├── services/
│   │   │   └── geminiService.js    # @google/genai integration & error mapping
│   │   ├── config.js               # Centralized server environment
│   │   └── index.js                # Server entry point
│   └── package.json
├── WhatIfAI_Antigravity_Prompt_Pack/ # Sequential prompt specifications
├── .gitignore                      # Strict ignore rules
└── README.md
```

---

## Environment Variables

### Server (`server/.env`)

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `GEMINI_API_KEY` | **Yes** (for live AI) | — | Google Gemini API key from [Google AI Studio](https://aistudio.google.com/apikey) |
| `GEMINI_MODEL` | Yes | `gemini-2.0-flash` | Configurable model identifier |
| `PORT` | No | `3001` | Express listener port |
| `CLIENT_ORIGIN` | No | `http://localhost:5173` | Allowed CORS origin |
| `NODE_ENV` | No | `development` | Environment mode (`development` or `production`) |
| `RATE_LIMIT_WINDOW_MS` | No | `60000` | Rate limiter window in milliseconds |
| `RATE_LIMIT_MAX_REQUESTS` | No | `10` | Max requests per IP within the window |
| `REQUEST_TIMEOUT_MS` | No | `30000` | Request timeout before aborting model call |

### Client (`client/.env`)

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `VITE_API_BASE_URL` | Yes | `http://localhost:3001/api` | Base URL of the backend API |

> 🔒 **Security Notice**: `GEMINI_API_KEY` is strictly server-side. It is never prefixed with `VITE_`, never committed to Git, and never exposed in client bundles.

---

## Getting Started Locally

### 1. Prerequisites
- Node.js version 18 or higher (`node -v`)
- npm version 9 or higher (`npm -v`)
- (Optional) Free Google Gemini API Key from [aistudio.google.com](https://aistudio.google.com/apikey)

### 2. Installation
```bash
# Clone the repository and navigate into it
cd "WhatIf AI"

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

### 3. Configure Secrets
```bash
# Server configuration
cp server/.env.example server/.env
# Open server/.env and insert your GEMINI_API_KEY:
# GEMINI_API_KEY=AIzaSy...

# Client configuration
cp client/.env.example client/.env
```

### 4. Running the Development Servers
Open two terminal windows:

**Terminal 1 (Backend API):**
```bash
cd server
npm run dev
# Running on http://localhost:3001
# Health check: http://localhost:3001/api/health
```

**Terminal 2 (Frontend Client):**
```bash
cd client
npm run dev
# Running on http://localhost:5173
```

---

## Verification & Testing

Both frontend and backend include automated test suites.

```bash
# Run client unit & routing tests (10 passing tests)
cd client
npm test

# Run client production build
cd client
npm run build

# Run server route, validation & error mapping tests (5 passing tests)
cd server
npm test

# Run ESLint on both packages
cd client && npm run lint
cd server && npm run lint
```

---

## Deployment Guide

### Frontend Deployment (Vercel / Netlify / Cloudflare Pages)

1. **Build Command**: `npm run build`
2. **Output Directory**: `dist`
3. **Environment Variable**: Set `VITE_API_BASE_URL` to your deployed backend URL (e.g. `https://whatif-api.onrender.com/api`).
4. **SPA Direct Route Refresh**:
   - For Netlify: `client/public/_redirects` is automatically included in `dist/`.
   - For Vercel: `client/vercel.json` provides rewrite fallback to `/index.html`.

### Backend Deployment (Render / Railway / Fly.io / Heroku)

1. **Build Command**: `npm install`
2. **Start Command**: `npm start`
3. **Environment Variables**:
   - `NODE_ENV=production`
   - `PORT=3001` (or host-assigned `$PORT`)
   - `GEMINI_API_KEY=<your-secret-key>`
   - `GEMINI_MODEL=gemini-2.0-flash`
   - `CLIENT_ORIGIN=https://your-frontend-domain.vercel.app`
4. **Health Check Endpoint**: `GET /api/health`

---

## QA Audit Scorecard

| Area | Test Description | Status |
|------|------------------|--------|
| **Setup** | Clean monorepo structure with isolated `client/` and `server/` | ✅ PASS |
| **Security** | No secrets in Git or frontend bundle; Helmet, CORS & rate-limiting enabled | ✅ PASS |
| **API Health** | `GET /api/health` returns status `ok`, timestamp & uptime | ✅ PASS |
| **Validation** | Prompt min 10 chars, max 500 chars, Zod schema validation on input & output | ✅ PASS |
| **Error Handling** | Graceful user-facing messages for `MISSING_API_KEY`, `RATE_LIMITED`, `MODEL_TIMEOUT` | ✅ PASS |
| **UX Polish** | Rotating descriptive generation status (no fake percentages) | ✅ PASS |
| **Persistence** | Versioned localStorage (`whatif:history:v1`) with corruption fallback & limit guard | ✅ PASS |
| **Comparison** | Juxtaposes exactly two scenarios side-by-side, stacks on mobile, prevents self-compare | ✅ PASS |
| **Follow-Up** | Context-grounded follow-up Q&A distinct from original scenario body | ✅ PASS |
| **Accessibility** | Focus-visible rings, ARIA live-region toasts, dialog focus traps, reduced-motion | ✅ PASS |
| **Responsiveness** | Tested and verified at 360px, 768px, 1024px, and 1440px desktop | ✅ PASS |
| **Routing** | Direct navigation, SPA route refreshes, and instant scroll-to-top | ✅ PASS |

---

## Speculative Notice & Ethics

WhatIf AI produces speculative fiction and structured counterfactual thought experiments. None of the scenarios, timelines, or impacts generated by this platform constitute medical, financial, legal, or scientific predictions. All content is labeled accordingly throughout the user interface.
