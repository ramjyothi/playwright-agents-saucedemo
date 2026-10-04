# Playwright Agents: SauceDemo E2E Automation

![Playwright Tests](https://github.com/ramjyothi/playwright-agents-saucedemo/actions/workflows/playwright.yml/badge.svg)

End-to-end UI test automation for [saucedemo.com](https://www.saucedemo.com), built with **Playwright + TypeScript**. The tests were created with Playwright's AI agents (planner, generator, healer) in VS Code, then reviewed and refined by me.

## Scenarios covered

| Spec file | What it tests |
|---|---|
| `login.spec.ts` | Valid and invalid login |
| `browse-products.spec.ts` | Browse, sort, and open product details |
| `cart.spec.ts` | Add, remove, and manage cart items |
| `checkout-information.spec.ts` | Checkout form and field validation |
| `complete-purchase.spec.ts` | End-to-end purchase flow |

The test plan is in [`specs/saucedemo-core-user-operations.plan.md`](specs/saucedemo-core-user-operations.plan.md).

## Tech stack

- Playwright Test
- TypeScript
- Node.js
- Playwright MCP + AI agents (planner, generator, healer)
- GitHub Actions (CI)

## Project structure

```
.
├── .github/
│   ├── agents/        # planner, generator, healer agent definitions
│   └── workflows/     # CI pipeline
├── specs/             # test plan (markdown)
├── tests/             # Playwright test files
├── playwright.config.ts
└── package.json
```

## How to run

```bash
npm install
npx playwright install
npx playwright test
```

Useful commands:

```bash
npx playwright test --headed          # watch the browser
npx playwright test tests/login.spec.ts   # run a single file
npx playwright show-report            # open the HTML report
```

## How it was built

1. **Planner agent** explored the app and wrote the test plan.
2. **Generator agent** turned the plan into Playwright tests.
3. **Healer agent** helped fix failing tests.
4. I reviewed the generated code, checked the locators and assertions, and ran the suite.

## Author

Ramajyothi, QA Automation Engineer