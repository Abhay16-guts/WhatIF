# 04 — Secure Gemini integration and backend API

Read the master brief and inspect current code. Implement the backend and connect the frontend. Keep the API key server-side only.

## Backend setup

Use Express and the official Google Gen AI JavaScript SDK `@google/genai`. Verify current SDK usage and supported model names against Google's official documentation before coding. The model must be configured once via `GEMINI_MODEL`; do not scatter model strings through the code.

Environment:
- `GEMINI_API_KEY`
- `GEMINI_MODEL`
- `PORT`
- `CLIENT_ORIGIN`
- `NODE_ENV`
- optional timeout and rate-limit settings

Never expose secrets through `VITE_*` variables, frontend bundles, browser storage or API responses.

## API endpoints

Implement:
- `GET /api/health` — simple health response, no secret details
- `POST /api/scenarios/generate` — generate a scenario
- `POST /api/scenarios/follow-up` — answer a follow-up using scenario context

Validate request bodies with Zod. Reject invalid input with HTTP 400 and a stable error shape:
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "A clear user-facing message."
  }
}

## Generation behavior

Request structured JSON from Gemini using the response-format/JSON-schema capabilities supported by the installed SDK and selected model. Validate the returned object with a server-side Zod schema matching the master brief.

Prompt instructions to Gemini:
- Treat input as a fictional thought experiment.
- Distinguish assumptions from known facts.
- Avoid presenting speculative future events as predictions.
- Create a plausible internal chain of consequences.
- Include balanced positive and negative effects.
- Keep each section concise and specific.
- Avoid harmful instructions and high-stakes advice.
- Use the selected tone and timeline scale.
- Return only the requested schema, with no Markdown fences.

Set safe limits:
- Prompt: 10–500 characters
- Timeline items: 4–8
- Assumptions: 2–5
- Follow-up questions: 3–5
- Limit text lengths per field
- Set request timeout
- Add rate limiting
- Add Express JSON body size limit
- Use Helmet
- Configure CORS to allow only the configured frontend origin in production

## Error handling

Map errors into safe user-facing codes:
- `MISSING_API_KEY`
- `RATE_LIMITED`
- `MODEL_QUOTA_EXCEEDED`
- `MODEL_TIMEOUT`
- `MODEL_UNAVAILABLE`
- `INVALID_MODEL_RESPONSE`
- `INTERNAL_ERROR`

Do not return raw stack traces, API key values or provider internals. Log useful diagnostic metadata without logging secrets. If output is invalid, retry/repair at most once; avoid unbounded retry loops.

## Frontend integration

Create one API client module that:
- Uses `VITE_API_BASE_URL`
- Handles JSON and non-JSON errors
- Uses AbortController / request timeout
- Normalizes errors
- Does not duplicate fetch logic across components

Show clear messages and retry actions for network failures, quota limits and missing server configuration. Do not leave the user staring at an infinite spinner.

## Tests

Add tests for:
- Valid and invalid request bodies
- Missing API key
- Model response validation
- Provider error mapping
- Health endpoint
- Frontend loading / success / failure states

Use a mock Gemini client in tests; tests must not consume real API quota.
