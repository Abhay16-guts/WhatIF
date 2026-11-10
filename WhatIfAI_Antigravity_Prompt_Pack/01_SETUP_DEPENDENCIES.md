# 01 — Repository setup and dependencies

Read `00_MASTER_BRIEF.md` first. Inspect the current workspace. If it is empty, create the project. If files already exist, preserve useful work and do not overwrite blindly.

## Tasks

1. Create a clean monorepo structure:
   - `client/` for React + Vite
   - `server/` for Express API
   - root `README.md` and `.gitignore`
2. Use JavaScript (not TypeScript) to keep the project approachable.
3. Pin compatible stable dependency versions rather than installing arbitrary latest major versions. Use Tailwind CSS **3.4.x** with its standard PostCSS configuration; do not mix Tailwind v3 and v4 setup instructions.
4. Frontend dependencies:
   - react, react-dom, vite
   - react-router-dom
   - tailwindcss 3.4.x, postcss, autoprefixer
   - framer-motion
   - lucide-react
   - zod (client-side schema/validation only if useful)
   - vitest, jsdom, @testing-library/react, @testing-library/jest-dom, @testing-library/user-event
5. Backend dependencies:
   - express
   - @google/genai
   - zod
   - cors
   - helmet
   - express-rate-limit
   - dotenv
   - pino-http or a similarly lightweight request logger (do not log secrets)
   - use Node's built-in test runner or one test framework consistently
6. Add scripts:
   - client: `dev`, `build`, `preview`, `lint`, `test`
   - server: `dev`, `start`, `test`, `lint`
   - root scripts only if they simplify running both apps; do not add unnecessary tooling.
7. Create `.gitignore` covering `node_modules`, `.env`, `.env.*` except `.env.example`, `dist`, logs, coverage and OS files.
8. Create `client/.env.example` with only public configuration such as `VITE_API_BASE_URL`.
9. Create `server/.env.example` with `PORT`, `CLIENT_ORIGIN`, `GEMINI_API_KEY`, `GEMINI_MODEL`, `NODE_ENV`, and any documented timeout/rate-limit values.
10. Add a simple health endpoint `GET /api/health`.
11. Add a README with exact install and run commands.

## Commands and verification

Run installs from the correct directories. Start frontend and backend in separate terminals. Verify:
- Vite opens successfully.
- Express health endpoint returns JSON.
- No dependency conflict or missing import.
- Build completes.
- `.env` is not tracked.
- No secret is present in client source or Vite environment.

## Guardrails

- Do not install UI component libraries unless there is a clear need.
- Do not add a database, auth or Docker at this stage.
- If a package version is incompatible, inspect package peer requirements and select a compatible stable version. Do not randomly downgrade multiple packages.
- Report exact commands run and results before proceeding.
