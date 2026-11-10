# 02 — Visual design system and application shell

Read the master brief and setup results. Implement the design system and responsive app shell before wiring AI.

## Art direction

Create a premium editorial product named **WHATIF / WORLD ATLAS**.

Visual reference direction:
- Editorial magazine layouts: oversized serif headlines, captions, numbered sections, fine divider lines and asymmetric grids.
- Linear / Stripe / Arc / Framer quality bar: precise spacing, crisp interactions, restrained motion and excellent typography.
- Do not copy any existing website. Do not use their logos or proprietary assets.
- No generic AI gradients, purple neon glow, robot illustrations or repetitive rounded cards.

## Design tokens

Create reusable CSS variables for:
- Background: warm paper / ivory
- Surface: slightly brighter paper
- Text: deep ink
- Muted text: warm grey
- Accent: choose one vivid cobalt OR vermilion and use consistently
- Border: subtle warm grey
- Success / warning / error semantic colors
- Radius scale: mostly small-to-medium; reserve larger radius for feature panels
- Spacing and container widths
- Typography: a distinctive serif display face and a neutral sans-serif UI face. Prefer reliable system fallbacks; if loading Google Fonts, use a resilient fallback and do not block rendering.

## Build

1. Set global styles, reset, typography, selection, focus-visible states and responsive container utilities.
2. Create app layout with header, main content and footer.
3. Create desktop and mobile navigation. Mobile menu must open/close accessibly, close on route navigation and close on Escape.
4. Add route-aware ScrollToTop behavior. On every route change, start the new page at the top. Ensure browser back/forward navigation remains sensible.
5. Create a home hero with:
   - small eyebrow label
   - bold editorial headline such as "A different world begins with one question."
   - concise explanatory text
   - prominent prompt composer placeholder
   - sample prompt chips
   - small "fiction / thought experiment" disclaimer
6. Add a visually distinctive sample "alternate world" feature section using static demo content.
7. Add a restrained footer with product note and navigation.
8. Add tasteful Framer Motion transitions only where they improve hierarchy. Respect `prefers-reduced-motion`.
9. Add a responsive 404 page.

## Quality checks

- Test at 360px, 390px, 768px, 1024px and wide desktop.
- No horizontal scroll.
- Header never overlaps content.
- Buttons have hover, active, focus and disabled states.
- Text remains readable and does not overflow.
- Images, if any, must be optimized and have alt text. Prefer CSS shapes / typography over random stock imagery.
- Avoid layout shifts; reserve dimensions for decorative elements.
