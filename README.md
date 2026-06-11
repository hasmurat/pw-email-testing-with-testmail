# EMAIL TESTING WITH PLAYWRIGHT and TESTMAIL

An automation framework for real-time and isolated testing of email content with Playwright and Testmail.

This repository is a Playwright-based framework for end-to-end testing of an application's email verification flow. The tests create a user account, fetch the verification code through Testmail, and complete the flow without depending on a real mailbox environment.

## Overview

- [Playwright](https://playwright.dev/) for UI automation
- `@faker-js/faker` for generating test data
- Testmail GraphQL API for reading email content
- `@testmail.app/graphql-request` for the GraphQL request layer
- `dotenv` for environment variables

The framework is designed around this flow:

1. User data is generated with faker.
2. The registration form is filled out in the application.
3. The latest verification email is fetched from the Testmail inbox.
4. The verification code is extracted from the email.
5. The code is entered into the application and the account is verified.

## Project Structure

- `playwright.config.js`: Playwright configuration and base URL.
- `tests/email-testing.spec.js`: Registration and email verification scenario.
- `tests/email.util.js`: Testmail GraphQL client and email-reading helpers.

## Requirements

- A Testmail account and API access
- The application under test must be running

## Setup

```bash
npm install
```

## Environment Variables

Create a `.env` file in the project root and define the following variables:

```env
TESTMAIL_API_URL=your_testmail_graphql_endpoint
TESTMAIL_API_KEY=your_testmail_api_key
TESTMAIL_YOUR_NAMESPACE=your_namespace
```

- `TESTMAIL_API_URL`: The Testmail GraphQL endpoint.
- `TESTMAIL_API_KEY`: The Testmail API authorization key.
- `TESTMAIL_YOUR_NAMESPACE`: The namespace used in inbox queries.

## Running Tests

This project does not define custom `scripts`. You can run the test directly with Playwright:

```bash
npx playwright test
```

To run only this scenario:

```bash
npx playwright test tests/email-testing.spec.js
```

## Test Flow

The current test scenario verifies the following:

- The user registration form is submitted successfully.
- The verification email sent through Testmail is read.
- The verification code inside the email is extracted.
- The account creation step is completed after the code is entered.

## Testmail Integration

`tests/email.util.js` creates a Testmail GraphQL client and queries the inbox through `@testmail.app/graphql-request`. This approach keeps the tests more stable by fetching email content from the API layer instead of waiting for it through the UI.

## Notes

- The default `baseURL` in `playwright.config.js` is `https://valentinos-magic-beans.click/`.
- The test scenario is configured to run under the `chromium` project.
- Testmail namespace structure is used when generating email addresses.
