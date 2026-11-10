# 00 — MASTER PROJECT BRIEF (Read before coding)

You are the lead product designer and full-stack engineer. Build **WhatIf AI**, a responsive alternate-reality exploration web application. Follow this document as the single source of truth. Do not start coding until you have inspected the repository and proposed a concise implementation plan.

## 1. Product goal

WhatIf AI turns a user's hypothetical question into a structured, imaginative, internally coherent alternate reality. Example input: "What if humans never needed sleep?"

The result should be useful, entertaining and easy to explore. Clearly label generated scenarios as fiction/speculation, not factual predictions.

## 2. MVP user journey

1. User lands on a distinctive editorial-style home page.
2. User enters a "What if..." question or selects a sample prompt.
3. User chooses an optional tone (Thoughtful, Cinematic, Scientific, Playful) and timeline scale (10, 50, 100 years).
4. User clicks Generate and sees a polished loading state with progress copy (do not fake percentage progress).
5. Backend calls Gemini securely and returns validated structured JSON.
6. User views the result in a readable scenario workspace with premise, assumptions, timeline, impact dimensions, short story and follow-up questions.
7. User can regenerate, copy sections, save/delete a scenario, revisit history, and compare two saved scenarios.
8. User can ask a follow-up question grounded in the selected scenario.

## 3. Required pages/routes

- `/` — Home / prompt composer
- `/create` — generation workspace (can share components with home)
- `/scenario/:id` — scenario details
- `/history` — saved scenarios
- `/compare` — compare two saved scenarios
- `*` — custom not-found page

Use React Router. Route changes must work when loaded directly from the address bar and after browser refresh. Configure SPA fallback on deployment.

## 4. Scenario response structure

The backend must request and validate JSON with this logical structure:

{
  "title": "string",
  "tagline": "string",
  "premise": "string",
  "assumptions": ["string"],
  "timeline": [
    {
      "yearLabel": "string",
      "eventTitle": "string",
      "description": "string"
    }
  ],
  "impacts": {
    "society": "string",
    "economy": "string",
    "technology": "string",
    "environment": "string",
    "culture": "string"
  },
  "story": {
    "title": "string",
    "body": "string"
  },
  "followUpQuestions": ["string"],
  "fictionNotice": "string"
}

Use a Zod schema on the server to validate model output. Set sensible maximum lengths and array limits. If model output is malformed, attempt one controlled repair/retry or return a clear recoverable error. Never render untrusted model output as HTML.

## 5. Design direction — not a generic AI dashboard

Create a distinctive **editorial atlas / speculative magazine** aesthetic:
- Warm ivory or pale parchment background, ink-black typography, one vivid electric-cobalt or vermilion accent, and muted secondary tones.
- Large expressive serif display headings paired with a clean modern sans-serif for UI.
- Strong typographic hierarchy, generous whitespace, thin rules, numbered sections, small metadata labels and editorial grids.
- A dark "night mode" scenario canvas or dark feature panel can provide contrast.
- Subtle paper grain or fine grid texture using CSS only; keep it lightweight.
- Use original layout composition inspired by high-quality editorial publications and polished products such as Linear, Stripe, Arc and Framer. Do not copy their layouts, logos, text or branding.
- Avoid the standard purple/blue gradient AI landing page, glowing blobs, excessive glassmorphism, generic robot illustrations, huge rounded cards everywhere and meaningless dashboard charts.
- Use purposeful transitions, not constant motion. Respect `prefers-reduced-motion`.

## 6. Core components

- SiteHeader / responsive navigation
- HomeHero
- PromptComposer
- ExamplePromptChips
- GenerationStatus
- ScenarioHeader
- AssumptionsList
- TimelineRail
- ImpactGrid
- StoryPanel
- FollowUpComposer
- CopyButton
- SaveButton
- HistoryList / EmptyState
- ScenarioCompare
- Toast / InlineError
- ConfirmDialog
- Footer
- ScrollToTop

## 7. Functional requirements

- All visible controls must work. No dead buttons or decorative inputs.
- Generate button disabled while request is pending or prompt is invalid.
- Prompt trim and length validation (for example 10–500 characters).
- Abort or ignore stale requests if user navigates away or starts a new generation.
- Show loading, success, empty, error and retry states.
- Save scenarios locally with stable IDs and timestamps.
- Persist history and theme/preferences in localStorage with defensive parsing and versioned storage keys.
- Copy buttons use Clipboard API with fallback and success/error feedback.
- Delete actions require confirmation.
- Compare exactly two saved scenarios; show a helpful empty state if fewer than two exist.
- Follow-up questions send the selected scenario context to the backend.
- Add a clear fiction/speculation notice.
- Do not present speculative claims as medical, legal, financial or scientific advice.

## 8. Technical quality requirements

- Keep API keys only on the server. Never expose `GEMINI_API_KEY` or any secret in Vite client variables.
- Use `.env.example`; ensure `.env` is ignored by Git.
- Centralize API base URL and model configuration.
- Use reusable components and small focused modules.
- Add loading/error boundaries where appropriate.
- Validate inputs on both client and server.
- Add rate limiting to the generation endpoint and a request body size limit.
- Use CORS allow-list configuration for production.
- Add security headers with Helmet.
- Do not log API keys, full private user prompts unnecessarily, or sensitive environment values.
- Handle missing API key, quota/rate limit, timeout, network failure, malformed model output and server errors.
- Use accessible labels, keyboard navigation, visible focus states, semantic HTML and adequate contrast.
- Test narrow mobile widths, tablet and desktop.
- No horizontal overflow, layout jumps, console errors or broken images.
- Use `window.scrollTo({ top: 0, behavior: "instant" })` or a compatible fallback on route changes; verify browser support and avoid smooth scrolling when it causes disorientation.
- On browser reload, the app must start at the top of the current route and preserve saved history.
- Add a custom 404 route and useful empty states.

## 9. Non-goals

Do not implement:
- User accounts or OAuth
- Paid plans or payment gateways
- Image/video/audio generation
- Real-time collaboration
- Complex admin dashboard
- MongoDB in the MVP
- Python microservices or embeddings unless explicitly approved later

## 10. Definition of done

The project is complete only when:
- `npm install` works from a clean checkout.
- Frontend and backend start with documented commands.
- `.env.example` is complete and no secret is committed.
- Main flow works with a valid Gemini key.
- Missing key and API failure show friendly messages.
- History survives refresh.
- All routes work on direct navigation and refresh in deployed SPA hosting.
- Mobile layout is usable at 360px width.
- Keyboard and reduced-motion behavior are checked.
- Lint/build/tests pass, or any known limitation is documented.
- Deployment instructions are tested and written in README.
