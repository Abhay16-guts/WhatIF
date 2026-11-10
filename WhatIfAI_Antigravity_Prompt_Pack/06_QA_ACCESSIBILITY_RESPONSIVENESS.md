# 06 — Responsive, accessibility, browser behavior and QA pass

Act as a strict QA engineer. Inspect the entire codebase and test the app. Fix issues rather than merely listing them.

## Responsive testing

Check at minimum:
- 320px and 360px small phones
- 390px modern phone
- 768px tablet
- 1024px laptop/tablet landscape
- 1366px desktop
- 1440px+ wide desktop

Verify:
- No horizontal overflow
- No clipped headings or buttons
- Navigation works on mobile
- Composer controls stack correctly
- Timeline is readable
- Compare layout stacks on narrow screens
- Dialogs fit within viewport and can scroll internally
- Footer and sticky elements do not cover content

## Scroll and reload behavior

- Scroll to top on route navigation.
- On full reload, current route begins at scroll position 0.
- Preserve the current URL and route on refresh.
- Preserve saved scenarios and preferences.
- Ensure direct route loading works on hosting with SPA rewrite/fallback.
- Avoid unwanted smooth-scroll behavior when users use browser back/forward.
- Add a visible back-to-top control only if pages are long enough to justify it.

## Error and edge-case testing

Test:
- Empty prompt
- Whitespace-only prompt
- Prompt below/above allowed length
- Double-click Generate
- Slow response
- User navigates away during generation
- Offline/network failure
- Backend unavailable
- Missing API key
- Gemini quota/rate limit
- Gemini malformed JSON
- Unexpected response shape
- localStorage unavailable or corrupted
- localStorage quota exceeded
- Clipboard API unavailable
- No saved scenarios
- Only one saved scenario on compare page
- Delete/cancel dialog behavior
- Invalid or unknown scenario ID
- Browser refresh on nested route

## Accessibility

- Semantic HTML landmarks
- One clear H1 per page
- Correct heading hierarchy
- Keyboard-operable navigation, menus, dialogs and controls
- Focus-visible styles
- Dialog focus trap and focus return
- Labels for all inputs
- Error messages associated with fields
- Toasts announced with suitable live regions
- Sufficient text/background contrast
- Alt text for meaningful images
- `prefers-reduced-motion` respected
- Do not communicate status by color alone

## Code quality

- Remove unused imports, dead code, duplicate styles and debug logs.
- No React key warnings.
- No unhandled promise rejections.
- No console errors or warnings in normal flows.
- No secrets in Git history or frontend bundle.
- Add error boundary and friendly fallback.
- Keep components focused and avoid huge monolithic files.
- Run lint, tests and production build.

Return a concise QA report with each test marked PASS / FAIL / NOT TESTED. Fix all failures that can be fixed without credentials. Clearly identify tests that require a real Gemini API key.
