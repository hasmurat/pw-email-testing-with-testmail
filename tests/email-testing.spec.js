// @ts-check
import { test, expect } from "@playwright/test";
import { getLatestEmail } from "../tests/email.util";
import { faker } from "@faker-js/faker";

test("As a user, I should be able to sign up successfully and receive a confirmation email", async ({
  page,
}) => {

  // Generate random user data using faker
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = `${process.env.TESTMAIL_YOUR_NAMESPACE}.${firstName}@inbox.testmail.app `;
  const password = faker.internet.password();

  // Navigate to the signup page and fill out the form
  await page.goto("/signup");
  await page.getByRole("textbox", { name: "First name" }).fill(firstName);
  await page.getByRole("textbox", { name: "Last name" }).fill(lastName);
  await page.getByRole("textbox", { name: "Email" }).fill(email);
  await page.getByRole("textbox", { name: "Password" }).fill(password);
  await page
    .getByRole("button", {
      name: "Create an account",
    })
    .click();

  // Retrieve the latest email from Testmail
  const emailContent = await getLatestEmail(firstName);
  const regex = /\d+$/;

  const code = emailContent.match(regex)[0];

  // Fill in the confirmation code and submit the form
  await page.locator('input[inputmode="numeric"]').fill(code);
  await page.getByRole("button", { name: "Confirm Account" }).click();

  // Assert that user is successfully signed up
  await expect(page.getByText("Account Created").first()).toBeVisible();
  
});
