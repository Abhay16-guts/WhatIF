# 05 — Complete the product features

Connect the UI to the real backend and finish the MVP flows.

## Generation flow

1. Submit prompt, tone and timeline range.
2. Disable duplicate submission.
3. Show a clear loading state with rotating descriptive status messages (do not fake a percentage).
4. On success, normalize the scenario object, assign a stable client ID and timestamp, and navigate to `/scenario/:id`.
5. On failure, preserve the user's prompt and show a useful retry action.
6. Cancel or ignore stale requests when the user leaves the page or starts a newer request.

## Scenario page

- Render all sections from validated data.
- Provide copy buttons for title, premise, timeline, impacts and story.
- Add save/unsave action.
- Add regenerate action with confirmation.
- Show generated timestamp and selected tone/timeline metadata.
- Display a persistent, unobtrusive "AI-generated fictional thought experiment" notice.

## History

- Store scenarios in versioned localStorage.
- Show newest first.
- Search by title and prompt.
- Delete one item after confirmation.
- Add clear-history action with confirmation.
- Handle corrupted storage and storage quota errors.
- If history is empty, explain how to create the first scenario.

## Compare

- Let users select two saved scenarios.
- Compare premise, timeline and impact dimensions side by side.
- On mobile, stack the two scenarios with clear labels rather than squeezing columns.
- Highlight differences using labels and typography, not misleading numerical scores.
- Prevent comparing a scenario with itself.
- If fewer than two scenarios are saved, show a clear empty state and a link to create another.

## Follow-up

- Send the selected scenario's relevant context and user's question to the backend.
- Keep follow-up answer visually distinct from the original generated scenario.
- Validate question length and handle loading/error/retry.
- Do not silently rewrite the original saved scenario.

## UX polish

- Add accessible toast feedback for save, delete, copy and errors.
- Add skeleton/loading states where useful.
- Add empty states and confirmation dialogs.
- Ensure keyboard focus is managed when dialogs open and close.
- Ensure all interactive elements have labels and visible focus rings.

## Acceptance test

Complete this end-to-end flow:
Home → generate → scenario details → copy → save → refresh → history → open saved item → compare two saved items → follow-up → delete.
No step should depend on hard refresh or developer tools.
