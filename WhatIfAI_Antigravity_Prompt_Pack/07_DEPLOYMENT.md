# 07 — Prepare and deploy the project

Read the full repository and prepare a deployment-ready version. Do not assume a specific provider if the user has not selected one; document a straightforward free-tier option and provider-neutral alternatives.

## Frontend deployment

Prepare the Vite frontend for a static hosting provider such as Vercel or Netlify:
- Build command: `npm run build`
- Output directory: `dist`
- Environment variable: `VITE_API_BASE_URL` pointing to the deployed backend
- Configure SPA fallback so `/scenario/:id`, `/history` and `/compare` work on direct refresh.
- Verify asset paths and production build.

## Backend deployment

Prepare Express backend for a Node-compatible host:
- Start command: `npm start`
- Set `NODE_ENV=production`
- Set `GEMINI_API_KEY` only in host secret/environment settings
- Set `GEMINI_MODEL` to a currently supported model
- Set `CLIENT_ORIGIN` to the exact deployed frontend origin
- Set `PORT` according to the host's injected port
- Ensure the server binds to `0.0.0.0` if required by host
- Ensure health route is available

## Security and configuration

- Never commit `.env`.
- Keep `.env.example` updated.
- CORS must not use wildcard origins in production.
- No API key in frontend build output.
- Do not expose detailed server errors.
- Document API quota and free-tier limitations.
- Add basic rate limiting and request timeout.

## Documentation

Update README with:
1. Project overview and feature list
2. Architecture summary
3. Tech stack
4. Prerequisites
5. Local setup commands
6. Environment variable table
7. How to obtain and configure a Gemini API key
8. Run frontend and backend locally
9. Test and build commands
10. Deployment steps
11. Known limitations / free-tier quotas
12. Troubleshooting

## Final verification

Run a clean production build. Test deployed frontend route fallback if deployment credentials are available. Do not claim deployment succeeded unless it was actually deployed and tested. If no hosting credentials are available, provide exact manual deployment instructions and mark deployment as not performed.
