# Antigravity Optimization Guide — WhatIf AI

Use this file throughout development to keep Antigravity accurate, efficient and consistent.

## 1. Work in small phases

- Give one numbered prompt at a time.
- Ask the agent to inspect files before editing.
- Ask for a short plan before a large change.
- Finish one phase and verify it before starting the next.
- Do not ask the agent to regenerate the entire application after every change.

## 2. Preserve working code

Add this instruction to follow-up requests:

"Inspect the existing implementation first. Preserve all working behavior and the current design system. Make the smallest targeted change. Do not rewrite unrelated files. Before editing, list the files you expect to change and why."

## 3. Require evidence

After each phase, ask:

"Run the relevant lint, tests and build. Report the exact commands and outcomes. Do not say something works unless you verified it. If a test cannot run, explain why."

## 4. Avoid context waste

- Keep `00_MASTER_BRIEF.md` as the source of truth.
- Refer to specific numbered prompt files rather than pasting the entire project specification repeatedly.
- Ask for concise summaries of changed files.
- Do not ask for repeated explanations of code already in the repository.
- Avoid asking the agent to print every file in full.
- Ask it to inspect only files related to the current task.

## 5. Use targeted bug reports

A good bug-fix request contains:
- Exact route or component
- Steps to reproduce
- Expected behavior
- Actual behavior
- Browser console/network error if available

Prompt template:

"Investigate this bug before editing. Reproduce it, identify the root cause, explain the smallest fix, implement it, and run the relevant test/build. Do not refactor unrelated code."

## 6. Keep dependencies stable

- Do not install a package for a feature already supported by the current stack.
- Check compatibility before changing package versions.
- Keep lockfiles committed.
- Do not mix Tailwind CSS v3 and v4 setup.
- Avoid adding a global state library for a small MVP.
- Avoid unnecessary chart, animation, UI-kit and icon packages.

## 7. Protect API secrets

- Gemini key belongs only in the Express server environment.
- Never prefix the key with `VITE_`.
- Never paste production secrets into source files, prompts, screenshots or Git commits.
- Use `.env.example` with placeholder values only.
- If a key was accidentally committed, remove it and rotate/revoke it; deleting it from the latest file is not enough.

## 8. Keep AI output predictable

- Ask Gemini for a defined JSON structure.
- Validate every model response with Zod on the backend.
- Set length and array limits.
- Handle malformed output.
- Limit retries to one controlled retry.
- Treat model output as untrusted text; never inject it as HTML.
- Keep the model name configurable.
- Check current model availability and free-tier quotas in official documentation.

## 9. Avoid false progress and fake features

- Do not display fake percentage progress.
- Do not show buttons that do nothing.
- Do not create fake AI-generated results in production mode. Mock data is acceptable only for development and must be clearly separated.
- If an optional feature cannot be completed, remove its UI or label it clearly as unavailable.

## 10. Design consistency

- Use the defined color, typography, spacing and radius tokens.
- Avoid introducing a new accent color on each page.
- Avoid generic purple AI gradients and overused glass cards.
- Use animation sparingly and honor reduced-motion preferences.
- Check mobile layout after every significant UI change.

## 11. Git checkpoints

At the end of each completed phase:
- Review `git diff`.
- Ensure no secrets or generated build folders are staged.
- Run tests/build.
- Commit a small logical checkpoint if the user is using Git.
- Never force-push, delete branches or overwrite user work without explicit approval.

## 12. Recommended Antigravity working loop

For each phase:

1. Read the relevant prompt file.
2. Inspect repository state.
3. State a concise plan.
4. Implement only that phase.
5. Run tests/lint/build.
6. Fix failures.
7. Summarize changed files and verification.
8. Wait for the next numbered prompt.

## 13. Emergency recovery prompt

If the agent makes a broad or broken change, use:

"Stop adding features. Inspect the current Git diff and identify exactly what changed. Restore unrelated behavior and preserve the last working architecture. Reproduce the reported failure, apply the smallest safe correction, and run tests/build. Do not reset, delete or overwrite user work. Report any change that cannot be safely reversed."
