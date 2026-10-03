import { test, expect } from '@playwright/test';

// spec: specs/saucedemo-core-user-operations.plan.md
// seed: tests/seed.spec.ts

test.describe('Core customer operations', () => {
  test('Add, inspect, and remove cart items', async ({ page }) => {
    // 1. From a fresh browser state, sign in as standard_user and add Sauce Labs Backpack from the catalog.
    await page.goto('https://www.saucedemo.com');
    await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
    await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Cart, 1 items' })).toBeVisible();

    // 2. Add Sauce Labs Bike Light and open the cart.
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await page.getByRole('button', { name: 'Cart, 2 items' }).click();
    await expect(page).toHaveURL(/cart\.html/);
    await expect(page.getByRole('button', { name: 'View details for Sauce Labs Backpack' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'View details for Sauce Labs Bike Light' })).toBeVisible();
    await expect(page.locator('.cart_quantity')).toHaveText(['1', '1']);
    await expect(page.getByRole('button', { name: 'Cart, 2 items' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Continue Shopping' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Checkout' })).toBeVisible();

    // 3. Remove Sauce Labs Backpack from the cart.
    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
    await expect(page.getByRole('button', { name: 'View details for Sauce Labs Backpack' })).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'View details for Sauce Labs Bike Light' })).toBeVisible();
    await expect(page.locator('.cart_quantity')).toHaveText(['1']);
    await expect(page.getByRole('button', { name: 'Cart, 1 items' })).toBeVisible();

    // 4. Select Continue Shopping, then open the cart again.
    await page.getByRole('button', { name: 'Continue Shopping' }).click();
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.getByText('Products', { exact: true })).toBeVisible();
    await page.getByRole('button', { name: 'Cart, 1 items' }).click();
    await expect(page).toHaveURL(/cart\.html/);
    await expect(page.getByRole('button', { name: 'View details for Sauce Labs Bike Light' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'View details for Sauce Labs Backpack' })).toHaveCount(0);
  });
});
