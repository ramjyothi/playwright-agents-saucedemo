# SauceDemo Core E-commerce User Operations

## Application Overview

Explore and test the five core end-user operations on SauceDemo (Swag Labs): sign in, browse and select a product, manage the shopping cart, provide checkout information, and review and complete an order. The site presents a demo username list, shared password, six products, cart actions, checkout form validation, an order summary with item/tax/total amounts, and an order confirmation. Run each test independently from a fresh browser state using standard_user and secret_sauce unless testing login rejection. Data and order effects are demo-only.

## Test Scenarios

### 1. Core customer operations

**Seed:** `tests/seed.spec.ts`

#### 1.1. Sign in with valid credentials and reject invalid credentials

**File:** `tests/saucedemo/login.spec.ts`

**Steps:**
  1. Start with a fresh browser state and open https://www.saucedemo.com.
    - expect: The Swag Labs login form is displayed with Username, Password, and Login controls.
    - expect: The page shows the demo usernames and indicates the shared password secret_sauce.
  2. Enter standard_user as the username and secret_sauce as the password, then select Login.
    - expect: The user is authenticated and navigated to the Products page.
    - expect: The product catalog and cart control are visible.
  3. In a fresh browser state, enter locked_out_user and secret_sauce, then select Login.
    - expect: Login is rejected and the user remains on the login page.
    - expect: A visible error explains that this user has been locked out.
  4. In a fresh browser state, submit the login form with both fields empty.
    - expect: The user remains on the login page.
    - expect: A visible validation error identifies the missing username.

#### 1.2. Browse, sort, and inspect products

**File:** `tests/saucedemo/browse-products.spec.ts`

**Steps:**
  1. From a fresh browser state, sign in as standard_user with secret_sauce.
    - expect: The Products page shows six product cards, product names, descriptions, prices, and Add to cart actions.
    - expect: The default sort selection is Name (A to Z).
  2. Change the Sort products control to Name (Z to A).
    - expect: Products reorder in descending alphabetical order.
  3. Change sorting to Price (low to high), then Price (high to low).
    - expect: Each selection reorders all products according to price in the selected direction.
    - expect: Displayed product prices remain associated with the correct products.
  4. Open the Sauce Labs Backpack product by selecting its name or image, then use Back to products.
    - expect: The detail page shows the selected product's image, name, description, price, and Add to cart action.
    - expect: Back to products returns to the catalog.

#### 1.3. Add, inspect, and remove cart items

**File:** `tests/saucedemo/cart.spec.ts`

**Steps:**
  1. From a fresh browser state, sign in as standard_user and add Sauce Labs Backpack from the catalog.
    - expect: The product action changes to Remove.
    - expect: The cart indicator shows one item.
  2. Add Sauce Labs Bike Light and open the cart.
    - expect: The cart displays both selected products with quantity 1 each and matching descriptions.
    - expect: The cart indicator reflects two items.
    - expect: Continue Shopping and Checkout actions are available.
  3. Remove Sauce Labs Backpack from the cart.
    - expect: The Backpack is removed while Bike Light remains.
    - expect: The cart indicator updates to one item.
  4. Select Continue Shopping, then open the cart again.
    - expect: The user returns to the catalog and can reopen the cart.
    - expect: The remaining Bike Light is preserved in the cart.

#### 1.4. Provide checkout information and validate required fields

**File:** `tests/saucedemo/checkout-information.spec.ts`

**Steps:**
  1. From a fresh browser state, sign in as standard_user, add Sauce Labs Backpack, open the cart, and select Checkout.
    - expect: Checkout: Your Information is displayed with First Name, Last Name, and Zip/Postal Code fields, plus Cancel and Continue controls.
  2. Select Continue without entering any information.
    - expect: The user stays on the checkout information page.
    - expect: A visible validation error identifies the missing first name.
  3. Enter a first name and last name but leave Zip/Postal Code empty, then select Continue.
    - expect: The user stays on the checkout information page.
    - expect: A visible validation error identifies the missing postal code.
  4. Enter a valid postal code and select Continue.
    - expect: Checkout: Overview is displayed.
    - expect: The order summary includes the selected product, quantity, payment and shipping information, item subtotal, tax, and total.

#### 1.5. Review and complete a purchase

**File:** `tests/saucedemo/complete-purchase.spec.ts`

**Steps:**
  1. From a fresh browser state, sign in as standard_user, add Sauce Labs Backpack to the cart, proceed through Checkout, and enter Taylor, Tester, and 90210 as the first name, last name, and postal code.
    - expect: The Checkout: Overview page lists Sauce Labs Backpack at $29.99 with quantity 1.
    - expect: The order totals show item total $29.99, tax $2.40, and total $32.39.
    - expect: Payment and shipping information are displayed.
  2. Verify the overview contents and select Finish.
    - expect: The Checkout: Complete! page appears with a thank-you confirmation and dispatch message.
    - expect: The cart is empty after the order is completed.
    - expect: Back Home and Generate PDF order controls are available.
  3. Select Back Home.
    - expect: The Products page is displayed and the cart remains empty.
