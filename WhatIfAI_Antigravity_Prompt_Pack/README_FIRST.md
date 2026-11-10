# WhatIf AI — Antigravity Prompt Pack

This pack contains a sequential set of prompts to build **WhatIf AI**, a polished alternate-reality exploration platform.

## What the app does

A user asks a hypothetical question such as:

> What if humans never needed sleep?

The app generates a structured alternate reality:
- A concise premise and assumptions
- A timeline of key events
- Social, economic, technological, environmental and cultural impacts
- A short fictional story set in that reality
- Follow-up questions
- A comparison view for two saved scenarios

## How to use this pack

1. Create an empty project folder and open it in Antigravity.
2. Give Antigravity `00_MASTER_BRIEF.md` first. Ask it to read the file fully and follow it as the source of truth.
3. Then give it prompts `01` through `08` **one at a time and in order**.
4. After each phase, run the app and verify the acceptance checklist before moving on.
5. Keep `ANTIGRAVITY_OPTIMIZATION.md` available throughout the work. It contains rules for efficient agent usage and avoiding unnecessary rewrites.
6. Never ask the agent to build everything in one huge step. Work phase by phase and ask it to summarize changed files and test results after each phase.

## Important product decisions

- Frontend: React + Vite + JavaScript
- Styling: Tailwind CSS 3.4 (pinned to a stable v3 setup), custom CSS design tokens
- Routing: React Router
- Motion: Framer Motion, used sparingly
- Icons: Lucide React
- Backend: Node.js + Express
- AI: Google Gemini API through the official `@google/genai` SDK, called only from the backend
- Validation: Zod
- Persistence: browser localStorage for MVP history and preferences; no database required for the first version
- Testing: Vitest + React Testing Library for frontend; Node test runner or Jest/Supertest for backend (choose one consistent setup)
- Deployment: frontend and backend can be deployed separately; use environment variables for all secrets

## Scope control

Build a dependable college-project MVP, not a production-scale SaaS. Do not add authentication, payments, teams, subscriptions, file uploads, image generation, audio generation, or a database unless explicitly requested later.

## API and model caveat

Gemini model names, free-tier availability, quotas and SDK behavior can change. Keep the model name configurable through `GEMINI_MODEL` and verify the current model name and limits from Google's official documentation during implementation. Do not hard-code a model name in multiple files. Never claim unlimited free usage.
