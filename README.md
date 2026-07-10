# Demo Web Shop — Playwright + TypeScript + Cucumber

This project is a migration of the original **Selenium + Java + TestNG** suite
(`Demo_WorkShop.zip`) to **Playwright + TypeScript**, using **Cucumber** for BDD-style
feature files. Target application: https://demowebshop.tricentis.com

## Why a rewrite instead of a line-by-line port

The original project had 8 test classes that were largely duplicates of the same
scenario (login → browse menu → configure a computer → add to cart → checkout),
each with small variations and some using ExtentReports. Rather than reproduce that
duplication, this project consolidates the flows into a **Page Object Model (POM)**
and reusable **Gherkin steps**, so each real scenario is expressed once.

## Project structure

```
├── features/                     # Gherkin .feature files (BDD scenarios)
│   ├── login.feature
│   ├── menuItems.feature
│   ├── buildComputer.feature
│   └── hoverShoppingCart.feature
├── src/
│   ├── config/
│   │   └── env.ts                # Reads .env (base URL, credentials, browser, headless, etc.)
│   ├── pages/                    # Page Object Model
│   │   ├── LoginPage.ts
│   │   ├── HomePage.ts
│   │   ├── BuildComputerPage.ts
│   │   ├── CartPage.ts
│   │   └── CheckoutPage.ts
│   ├── step-definitions/         # Cucumber step definitions (map Gherkin -> Page Objects)
│   │   ├── login.steps.ts
│   │   ├── menuItems.steps.ts
│   │   ├── buildComputer.steps.ts
│   │   └── hoverShoppingCart.steps.ts
│   └── support/
│       ├── world.ts              # Custom Cucumber World holding Playwright browser/page
│       ├── hooks.ts              # Before/After hooks: browser lifecycle, screenshot on failure
│       └── generateHtmlReport.js # Generates a rich HTML report (replaces ExtentReports)
├── cucumber.js                   # Cucumber runner configuration
├── tsconfig.json
├── package.json
└── .env.example                  # Copy to .env and fill in values
```

## Mapping from the original Java classes

| Original Selenium/Java file                     | Migrated to                                                            |
|---------------------------------------------------|-------------------------------------------------------------------------|
| `Utils.java` (sleep helper)                       | Not needed — Playwright auto-waits; no `Thread.sleep`/manual sleeps required |
| `HoverAndClick.java`                               | `features/hoverShoppingCart.feature` + `HomePage.hoverShoppingCartAndGoToCart()` |
| `MenuItemCount.java`, `MenuItemCountt.java`        | `features/menuItems.feature` (menu count/screenshot) + `features/buildComputer.feature` (add-to-cart/checkout portion) |
| `demoextendcopy.java`, `DemoWebShopTestWithExtentReports.java` | Same flows, consolidated; ExtentReports replaced by `multiple-cucumber-html-reporter` + Cucumber's built-in failure-screenshot attachment |
| `validloginPOM.java`, `validloginPOMcopy.java`     | `features/buildComputer.feature` full checkout scenario + `LoginPage`, `BuildComputerPage`, `CartPage`, `CheckoutPage` |

## Setup

```bash
npm install
npm run install:browsers   # installs Playwright browser binaries
cp .env.example .env       # then edit .env if needed
```

## Running tests

```bash
npm test                   # headless, uses BROWSER from .env (default: chromium)
npm run test:headed        # visible browser window
npm run test:chromium      # force Chromium
npm run test:firefox       # force Firefox
npm run test:webkit        # force WebKit
```

## Reports

- Cucumber JSON/HTML: `reports/cucumber-report.json`, `reports/cucumber-report.html`
- Richer HTML dashboard (replacement for ExtentReports):
  ```bash
  npm run report:html
  ```
  Output: `reports/html-report/index.html`
- Screenshots on failure are auto-attached to the report via `AfterStep` in `hooks.ts`.
- Home page screenshot from the menu-items scenario is saved to `screenshots/demo_webshop_home.png`.

## Notes / improvements made during migration

- **No hardcoded credentials in source** — moved to `.env` (`LOGIN_EMAIL` / `LOGIN_PASSWORD`).
- **No `Thread.sleep`** — replaced with Playwright's built-in auto-waiting and explicit
  `expect(...).toHaveText/toHaveURL(...)` assertions with timeouts, which are faster and
  far less flaky than fixed sleeps.
- **Window/child-window switching** (`driver.getWindowHandles()` in the original) is
  handled naturally by Playwright's single-page navigation model for this site; if a
  true new tab/window is opened by the app, use `context.waitForEvent('page')` inside
  the relevant page object.
- The three near-duplicate end-to-end classes (`validloginPOM`, `validloginPOMcopy`,
  `MenuItemCount`/`MenuItemCountt`) were merged into one canonical
  `features/buildComputer.feature` flow with a `Scenario Outline` so quantity/country/zip
  can be parameterized instead of copy-pasted.
