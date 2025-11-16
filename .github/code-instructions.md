# Pull Request Checklist

Before requesting review, confirm all items below are complete. These items are meant to be automated/validated by CI where possible.

//- [ ] Branch name follows convention (e.g., feature/issue-1234-description or bugfix/issue-1234)
//- [ ] Ticket/JIRA ID linked in PR description
- [ ] Code compiles and TypeScript strict mode passes (tsc --noEmit)
- [ ] ESLint and Prettier run and fixes applied (npm run lint && npm run format)
- [ ] No use of `any` or other banned patterns; addressed any CI lint warnings
- [ ] Unit and integration tests added/updated where applicable and all tests pass (npm test)
- [ ] Playwright tests updated/added for UI changes and pass locally
- [ ] New code covered by meaningful assertions and avoids fragile locators
- [ ] No secrets, passwords, or keys committed (.env used and documented)
- [ ] Storage states, session files, or fixtures updated if authentication changed
- [ ] CI artifacts (screenshots, traces) produced on failures and configured for reporting
- [ ] Changelog updated if behaviour or public API changed
- [ ] Documentation (README, docs) updated for user-facing or infra changes
- [ ] Requested reviewers added and expected reviewers notified

---

# Quick Reference (do not replace checklist — actionable items above must be completed)

Global Standards
- Use meaningful names; follow project folder structure: utils/, constants/, components/, types/, helpers/, test/.
- No spelling mistakes; consistent naming conventions.

Naming conventions
- Files/folders: kebab-case (e.g., user-login-test)
- Variables/methods: camelCase (e.g., calculateTotal)
- Selectors/locators & types/interfaces: PascalCase; prefix interfaces with `I` (e.g., IUser)

Framework & Quality
- Keep code modular and reusable; extract utilities to avoid duplication.
- Use setup/teardown in tests to reset environment.
- Use try/catch/finally for error handling where appropriate.
- Enforce ESLint & Prettier; CI should fail on violations.

TypeScript
- Enable strict mode in tsconfig.json.
- Prefer explicit types/interfaces; avoid `any`.
- Use readonly for constants, enums/union types for fixed sets.
- Prefer async/await; export only necessary types.

Testing Principles (3I)
- Independent: tests don't rely on each other.
- Isolated: avoid side-effects between tests.
- Idempotent: tests consistently produce same results.

Locator Strategy
- Avoid index-based locators. Prefer data-test-id, unique IDs/names, CSS selectors, or relative XPaths.
- Use regex for dynamic locators. Confirm visibility/enabled before action.
- Prefer Page Object Model for reuse.

Assertions
- Include at least one meaningful assertion per test.
- Use hard assertions for critical checks; soft assertions for optional checks.

Test Data & Security
- Avoid hard-coding sensitive values; use .env and secret management.
- Do not commit credentials. Use storageState.json for session reuse where needed.

Playwright + TypeScript Best Practices
- New browser context per test; reuse login sessions with storageState.json.
- Mock APIs with page.route() where appropriate. Validate requests/assert payloads.
- Use built-in assertions (toHaveText, toHaveCount). Configure retries for flaky tests.
- Collect reports: Allure/HTML, screenshots, videos, traces.

Configurations & Documentation
- Centralize configuration in playwright.config.ts.
- Provide CLI commands and README with setup/run instructions.
- Configure retries, reporters, env vars, parallelization in config.

CI & Enforcement
- CI should run typecheck, lint, tests, and Playwright runs (or smoke subset).
- Fail PRs on critical violations (use of any, hard-coded secrets, failing tests).
- Auto-fix minor lint/format issues where feasible.

Notes for Reviewers
- Verify the PR checklist is complete.
- Focus on: correctness, test coverage, security (no secrets), and maintainability.
- Request changes if missing tests, failing CI checks, or unclear naming and API design.

<!-- Detailed guidance retained below for contributors; can be pruned or expanded as needed. -->
<!-- JIRA & Test Suite Management
============================
- Include JIRA ID at the suite level for clear reference.
- Logically group tests into Smoke and Regression categories.
- Maintain traceability between JIRA issues and test runs for effective tracking. -->