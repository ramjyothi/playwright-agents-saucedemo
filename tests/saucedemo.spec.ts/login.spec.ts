import { test, expect } from '@playwright/test';

// spec: specs/saucedemo-core-user-operations.plan.md
// seed: tests/seed.spec.ts

test.describe('Core customer operations', () => {
  test('Sign in with valid credentials and reject invalid credentials', async ({ page }) => {
    // 1. Start with a fresh browser state and open https://www.saucedemo.com.
    await page.goto('https://www.saucedemo.com');
    await expect(page.getByRole('form', { name: 'Login' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
    await expect(page.getByText(/standard_user.*locked_out_user/)).toBeVisible();
    await expect(page.getByText('secret_sauce')).toBeVisible();

    // 2. Enter standard_user as the username and secret_sauce as the password, then select Login.
    await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
    await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.getByText('Products', { exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Cart, empty' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Add to cart' })).toHaveCount(6);

    // 3. In a fresh browser state, enter locked_out_user and secret_sauce, then select Login.
    await page.goto('https://www.saucedemo.com');
    await page.getByRole('textbox', { name: 'Username' }).fill('locked_out_user');
    await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.getByText('Epic sadface: Sorry, this user has been locked out.')).toBeVisible();

    // 4. In a fresh browser state, submit the login form with both fields empty.
    await page.goto('https://www.saucedemo.com');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.getByText('Epic sadface: Username is required')).toBeVisible();
  });
});
