import {test, expect} from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe("Cart and Checkout Test Scenarios",()=>{
    test.beforeEach(async ({page})=>{
        await page.goto("https://practicesoftwaretesting.com/");
        await expect(page.getByTitle("Practice Software Testing - Toolshop")).toBeVisible();
        const firstProductLocator = page.getByTestId('product-name').first();
        await firstProductLocator.waitFor({state:'visible'});
        await firstProductLocator.click();

        await page.waitForURL("**/product/**");
        await expect(page.getByTestId('product-name')).toBeVisible();
        const productName = await page.getByTestId('product-name').innerText();

        await page.getByRole('button',{name:'Add to cart'}).click();
        await expect(page.getByRole('alert',{name:'Product added to shopping cart.'})).toBeVisible();
        await page.getByRole('alert',{name:'Product added to shopping cart.'}).waitFor({state:'detached'});
        await expect(page.getByTestId('nav-cart')).toBeVisible();
        await expect(page.getByTestId('cart-quantity')).toHaveText('1');

        await page.getByTestId('nav-cart').click();
        await expect(page.getByTestId('product-title')).toHaveText(productName);
    })
    
    test("Update quantity of product in cart", async ({page})=>{
        await page.getByTestId('product-quantity').click();
        await page.getByTestId('product-quantity').fill('2');
        await page.getByTestId('product-quantity').press('Enter');
        await expect(page.getByTestId('cart-quantity')).toHaveText('2');
    })
    test("Remove product from cart", async ({page})=>{
        await page.locator('.btn-danger').click();
        await expect(page.getByRole('alert',{name:'Product deleted.'})).toBeVisible();
        await page.getByRole('alert',{name:'Product deleted.'}).waitFor({state:'detached'});
        await expect(page.getByText('The cart is empty. Nothing to display.',{exact:true})).toBeVisible();
    })
    test("Validate guest checkout process", async ({page})=>{
        await page.getByRole('button',{name:'Proceed to checkout'}).click();
        await page.getByRole('tab',{name:'Continue as Guest'}).click();
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const buyerEmail = faker.internet.email({ firstName, lastName });
        await page.getByTestId('guest-email').fill(buyerEmail);
        await page.getByTestId('guest-first-name').fill(firstName);
        await page.getByTestId('guest-last-name').fill(lastName);
        await page.getByTestId('guest-submit').click();
        const displayText = `Continuing as guest: ${firstName} ${lastName} (${buyerEmail})`
        await expect(page.getByText(displayText,{exact:true})).toBeVisible();
        await page.getByRole('button',{name:'Proceed to checkout'}).click();
        await expect(page.getByRole('heading', { name: 'Billing Address' })).toBeVisible();
        await page.getByTestId('country').click();
        await page.getByTestId('country').selectOption('United States of America (the)');
        await page.getByTestId('postal_code').fill('10010');
        await page.getByTestId('house_number').fill('23');
        await page.getByRole('button',{name:'Proceed to checkout '}).click();
        await page.getByTestId('payment-method').click();
        await page.getByTestId('payment-method').selectOption('Cash on Delivery');
        await page.getByRole('button',{name:'Confirm'}).click();
        await expect(page.getByTestId('payment-success-message')).toContainText('Payment was successful');
        await page.getByRole('button',{name:'Confirm'}).click();
        await page.locator('#order-confirmation').waitFor({state:'visible'});
        const orderConfirmationText = await page.locator('#order-confirmation').innerText();
        expect(orderConfirmationText).toContain('Thanks for your order! Your invoice number is');

    })
})