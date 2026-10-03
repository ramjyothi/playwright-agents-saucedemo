import { test, expect } from '@playwright/test';

// spec: specs/saucedemo-core-user-operations.plan.md
// seed: tests/seed.spec.ts

test.describe('Core customer operations', () => {
  test('Browse, sort, and inspect products', async ({ page }) => {
    // 1. From a fresh browser state, sign in as standard_user with secret_sauce.
    await page.goto('https://www.saucedemo.com');
    await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
    await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('Products', { exact: true })).toBeVisible();

    const productNames = page.locator('.inventory_item_name');
    const productPrices = page.locator('.inventory_item_price');
    const sortControl = page.getByRole('combobox', { name: 'Sort products' });
    await expect(productNames).toHaveCount(6);
    await expect(page.getByRole('button', { name: 'Add to cart' })).toHaveCount(6);
    await expect(sortControl).toHaveValue('az');
    await expect(productNames).toHaveText([
      'Sauce Labs Backpack',
      'Sauce Labs Bike Light',
      'Sauce Labs Bolt T-Shirt',
      'Sauce Labs Fleece Jacket',
      'Sauce Labs Onesie',
      'Test.allTheThings() T-Shirt (Red)',
    ]);

    // 2. Change the Sort products control to Name (Z to A).
    await sortControl.selectOption('za');
    await expect(sortControl).toHaveValue('za');
    await expect(productNames).toHaveText([
      'Test.allTheThings() T-Shirt (Red)',
      'Sauce Labs Onesie',
      'Sauce Labs Fleece Jacket',
      'Sauce Labs Bolt T-Shirt',
      'Sauce Labs Bike Light',
      'Sauce Labs Backpack',
    ]);

    // 3. Change sorting to Price (low to high), then Price (high to low).
    await sortControl.selectOption('lohi');
    await expect(sortControl).toHaveValue('lohi');
    await expect(productNames).toHaveText([
      'Sauce Labs Onesie',
      'Sauce Labs Bike Light',
      'Sauce Labs Bolt T-Shirt',
      'Test.allTheThings() T-Shirt (Red)',
      'Sauce Labs Backpack',
      'Sauce Labs Fleece Jacket',
    ]);
    await expect(productPrices).toHaveText(['$7.99', '$9.99', '$15.99', '$15.99', '$29.99', '$49.99']);

    await sortControl.selectOption('hilo');
    await expect(sortControl).toHaveValue('hilo');
    await expect(productNames).toHaveText([
      'Sauce Labs Fleece Jacket',
      'Sauce Labs Backpack',
      'Sauce Labs Bolt T-Shirt',
      'Test.allTheThings() T-Shirt (Red)',
      'Sauce Labs Bike Light',
      'Sauce Labs Onesie',
    ]);
    await expect(productPrices).toHaveText(['$49.99', '$29.99', '$15.99', '$15.99', '$9.99', '$7.99']);

    // 4. Open the Sauce Labs Backpack product by selecting its name or image, then use Back to products.
    await page.locator('[data-test="item-4-title-link"]').click();
    await expect(page.getByRole('img', { name: 'Sauce Labs Backpack' })).toBeVisible();
    await expect(page.getByText('Sauce Labs Backpack', { exact: true })).toBeVisible();
    await expect(page.getByText('carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.')).toBeVisible();
    await expect(page.getByText('$29.99', { exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Add to cart' })).toBeVisible();
    await page.getByRole('button', { name: 'Back to products' }).click();
    await expect(page.getByText('Products', { exact: true })).toBeVisible();
    await expect(productNames).toHaveCount(6);
  });
});
