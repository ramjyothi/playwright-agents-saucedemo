import { test, expect } from '@playwright/test';

// spec: specs/saucedemo-core-user-operations.plan.md
// seed: tests/seed.spec.ts

test.describe('Core customer operations', () => {
  test('Provide checkout information and validate required fields', async ({ page }) => {
    // 1. From a fresh browser state, sign in as standard_user, add Sauce Labs Backpack, open the cart, and select Checkout.
    await page.goto('https://www.saucedemo.com');
    await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
    await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.getByRole('button', { name: 'Checkout' }).click();
    await expect(page).toHaveURL(/checkout-step-one\.html/);
    await expect(page.getByText('Checkout: Your Information')).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'First Name' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Last Name' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Zip/Postal Code' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Continue' })).toBeVisible();

    // 2. Select Continue without entering any information.
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page).toHaveURL(/checkout-step-one\.html/);
    await expect(page.getByRole('alert')).toContainText('First Name is required');

    // 3. Enter a first name and last name but leave Zip/Postal Code empty, then select Continue.
    await page.getByRole('textbox', { name: 'First Name' }).fill('Taylor');
    await page.getByRole('textbox', { name: 'Last Name' }).fill('Tester');
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page).toHaveURL(/checkout-step-one\.html/);
    await expect(page.getByRole('alert')).toContainText('Postal Code is required');

    // 4. Enter a valid postal code and select Continue.
    await page.getByRole('textbox', { name: 'Zip/Postal Code' }).fill('90210');
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page).toHaveURL(/checkout-step-two\.html/);
    await expect(page.getByText('Checkout: Overview')).toBeVisible();
    await expect(page.getByRole('button', { name: 'View details for Sauce Labs Backpack' })).toBeVisible();
    await expect(page.locator('.cart_quantity')).toHaveText(['1']);
    await expect(page.getByText('Payment Information:')).toBeVisible();
    await expect(page.getByText('Shipping Information:')).toBeVisible();
    await expect(page.getByText('Item total: $29.99')).toBeVisible();
    await expect(page.getByText('Tax: $2.40')).toBeVisible();
    await expect(page.getByText('Total: $32.39')).toBeVisible();
  });
});
