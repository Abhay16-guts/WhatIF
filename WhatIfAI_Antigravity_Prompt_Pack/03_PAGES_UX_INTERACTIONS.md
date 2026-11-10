# 03 — Pages, reusable components and UX states

Read all prior project instructions. Build the frontend pages with mock scenario data first. Do not connect the Gemini API yet.

## Routes

Implement:
- `/` home page
- `/create` prompt and generation workspace
- `/scenario/:id` scenario detail page
- `/history` saved scenario library
- `/compare` two-scenario comparison
- `*` not-found page

## Scenario detail layout

Use an editorial report structure, not a dashboard:
1. Scenario number, title, tagline and generated date
2. Premise / "the divergence"
3. Assumptions
4. Timeline as a vertical rail on mobile and a clean horizontal or vertical composition on desktop
5. Impact sections: Society, Economy, Technology, Environment, Culture
6. Short story feature panel
7. Follow-up questions
8. Fiction notice and actions

## Interactions

- Prompt composer with character count, trimmed input and client validation.
- Sample prompt chips populate the composer.
- Tone selector: Thoughtful, Cinematic, Scientific, Playful.
- Timeline selector: 10, 50 or 100 years.
- Generate button and loading placeholder (mock for now).
- Copy individual sections and full result.
- Save / unsave scenario.
- Regenerate scenario confirmation if it would replace current result.
- History list with search/filter by title and sort newest first.
- Delete scenario with accessible confirmation dialog.
- Compare page requires exactly two selected saved scenarios.
- Follow-up composer with submit, loading and error states (mock for now).
- Toast notifications that are announced accessibly.
- Empty states with clear calls to action.

## State management

Keep state simple. Use React state and small custom hooks; do not add Redux. Use localStorage for saved history and preferences:
- Use a versioned key, e.g. `whatif:history:v1`.
- Wrap reads/writes in try/catch.
- Validate parsed data before using it.
- Handle corrupted or unavailable localStorage gracefully.
- Keep storage utilities separate from components.
- Save stable IDs and ISO timestamps.
- Limit history to a reasonable number (e.g. 30) and tell the user when the limit is reached.

## Navigation and browser behavior

- Directly opening any route must render correctly.
- Refreshing a scenario route must preserve the scenario from localStorage.
- On reload, scroll starts at top.
- Route changes scroll to top; do not unexpectedly scroll to top when only opening an in-page disclosure.
- Add a skip-to-content link.
- Use semantic landmarks and correct heading order.

## Acceptance

Test all actions with mock data. No dead buttons, broken links, missing keys or console errors. Do not proceed until core flows work on mobile and desktop.
