Global Standards (Applies to All Files)
=======================================
- Use meaningful variable, function, file, and folder names – no abbreviations or unclear terms.
- No spelling mistakes.
- Follow consistent naming conventions.
- Ensure files are organized correctly into: `utils/`, `constants/`, `components/`, `types/`, `helpers/`,
`test/` etc.
Naming Conventions
==================
- Use kebab-case for folder and file names (e.g., `user-login-test`, `api-utils`).
- Use camelCase for methods and variables (e.g., `calculateTotal`, `userName`).
- Use PascalCase for selectors (locators) (e.g., `SubmitButton`, `UserProfileSection`).
- Use PascalCase for types and interfaces, prefixing interfaces with "I" (e.g., `IUser`, `type
TradeData`).
- Ensure names are descriptive and consistent across the codebase.
Framework Structure & Quality
=============================
- Ensure code is modular, reusable, and maintainable for easy updates and scalability.
- Extract and reuse utility/helper functions to promote efficiency and reduce redundancy.
- Enforce code quality with ESLint & Prettier for consistent linting and formatting.
- Use setup/teardown processes to reset the environment before and after tests.
- Apply proper error handling with try/catch/finally blocks.
- Avoid unnecessary blank lines and spelling mistakes to maintain clarity.
- Include minimal, necessary comments to enhance understanding without clutter.
TypeScript Standards
====================
- Enable strict mode in `tsconfig.json` for enhanced type safety.
- Prefer types/interfaces over using any to ensure type clarity.
- Use readonly for defining constants to prevent unintended modifications.
- Favor enums/union types over string literals for better type safety and readability.
- Prefer using async/await over then/catch for handling asynchronous operations.
- Define DTOs (Data Transfer Objects) for complex request and response structures.
- Export only necessary interfaces and types to maintain a clean and efficient codebase.
- Properly escape regex patterns in JSON: Use double backslashes `\d` instead of single `\d` when
storing regex.
3I Testing Principles
=====================
- Independent: Ensure each test runs independently, with no reliance on the outcome of other tests.
- Isolated: Design tests to avoid affecting each other, maintaining a clean state before and after
execution.
- Idempotent: Guarantee that tests produce the same result every time they are re-run.
Locator Strategy
================
- Do not use index-based locators (e.g., div[3]) to ensure stability and maintainability.
- Choose data-test-id, unique IDs/names, CSS selectors, and relative XPaths for precise and stable
targeting.
- Use regex patterns for dynamic locators instead of string concatenation.
- Prefer direct data-testid values over CSS selectors targeting static elements.
- Utilize the Page Object Model to organize and reuse locators, enhancing code reusability and
readability.
- Confirm element visibility and enablement before performing actions.
- Employ explicit waits to manage dynamic content loading and avoid hard-coded sleeps.
Assertions
==========
- Include Meaningful Assertions: Ensure each test contains at least one meaningful assertion.
- Directly Validate Intended Behavior: Confirm the intended behavior and outcomes of the test.
- Use Hard Assertions for Critical Checks: Critical validations where failure should halt the test.
- Use Soft Assertions for Optional Validations: Optional checks to allow the test to continue.
Test Data Handling Guidelines
=============================
- Avoid Hard-Coding Sensitive Values: Do not expose sensitive information like passwords or API
keys.
- Manage Sensitive Data with .env and Encryption: Store sensitive data securely in `.env` with
encryption.
- Centralize Configuration in playwright.config.ts for easy maintenance.
- Maintain Hierarchical Test Data Structure for clarity.
Playwright + TypeScript Best Practices
======================================
- New Browser Context per Test: Ensure test isolation by creating a new context per test.
- Session Reuse with storageState.json: Reuse login sessions to reduce login overhead.
- API Mocking with page.route(): Mock APIs to simulate scenarios.
- Validate Requests: Use expect(request.postDataJSON()) to validate request payloads.
- Configure Retries: Handle flaky tests by setting retries in `playwright.config.ts`.
- Use Built-in Assertions: Use `toHaveText` and `toHaveCount` for reliable checks.
- Parallel-Safe Tests: Ensure tests run parallel across multiple devices/browsers.
- Comprehensive Reporting: Store Allure/HTML reports, screenshots, videos, traces.
Configurations & Documentation
==============================
- Use CLI commands for execution flexibility.
- Maintain a detailed README.md with setup instructions, naming conventions, and execution
guide.
- Configure retries, reporters, environment variables, and parallelization in `playwright.config.ts`.
Security & Quality
==================
- Store sensitive data in `.env` files and manage secrets using Vault or GitHub Secrets.
- Ensure no credentials are committed to the codebase.
- Implement performance validations to ensure application efficiency.
<!-- JIRA & Test Suite Management
============================
- Include JIRA ID at the suite level for clear reference.
- Logically group tests into Smoke and Regression categories.
- Maintain traceability between JIRA issues and test runs for effective tracking. -->
Violations & Auto-correction
============================
- Copilot must auto-correct violations before finalizing the output.
- Developer PRs with violations will be auto-rejected by CI check.
- Common violations like `any`, inline event handlers, or hardcoded strings must be flagged.
- The changes should align with project coding standards without altering intended behavior