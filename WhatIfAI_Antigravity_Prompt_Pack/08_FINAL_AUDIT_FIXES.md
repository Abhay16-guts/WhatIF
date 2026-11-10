# 08 — Final audit, bug fixing and handover

You are now the release engineer. Inspect every project file and verify the application against `00_MASTER_BRIEF.md`.

## Required audit

1. Install from a clean dependency state (use lockfiles; do not delete lockfiles casually).
2. Run frontend lint, tests and production build.
3. Run backend lint/tests.
4. Start frontend and backend and verify health endpoint.
5. Test the full happy path with a real API key only if one is configured.
6. Test error paths using mocks; do not waste real API calls.
7. Search the repository for `GEMINI_API_KEY`, `AIza`, tokens and accidental secrets. Ensure secrets are not committed or bundled.
8. Inspect browser console and network requests.
9. Test mobile widths and direct route refresh.
10. Check all visible links and buttons.
11. Check scroll-to-top and reload behavior.
12. Check localStorage persistence and corrupted-data fallback.
13. Check keyboard navigation and reduced motion.
14. Check that the app clearly labels content as fictional/speculative.

## Fixing rules

- Fix root causes, not symptoms.
- Make the smallest safe change.
- Do not rewrite working components to satisfy stylistic preferences.
- Do not replace the chosen stack.
- Do not add new dependencies unless necessary.
- After each fix, rerun the relevant test and build.
- Never silence lint/test errors without understanding them.
- Do not claim a test passed if it was not run.

## Handover

Update README and provide:
- Final folder structure
- Exact local run commands
- Required environment variables
- Test/build results
- Known limitations
- Deployment checklist
- Any remaining manual steps

The project is ready only when all critical flows work, production build passes, no secret is exposed, and unresolved issues are explicitly documented.
