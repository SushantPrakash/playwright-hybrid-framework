import {test, expect} from "@playwright/test";

test.describe("Product Detail Test Scenarios",()=>{
    test.beforeEach(async ({page})=>{
        await page.goto("https://practicesoftwaretesting.com/");
        await expect(page.getByTitle("Practice Software Testing - Toolshop")).toBeVisible();
    })

    test("Validate product detail is displayed", async ({page})=>{
        const firstProductLocator = page.getByTestId('product-name').first();
        const firstProductName = await firstProductLocator.innerText();
        const firstProductPrice = await page.getByTestId('product-price').first().innerText();
        await firstProductLocator.click();
        await page.waitForURL("**/product/**");
        await expect(page.getByTestId('product-name')).toBeVisible();
        await expect(page.getByTestId('product-name')).toHaveText(firstProductName);
        await expect(page.locator('.price-section')).toHaveText(firstProductPrice);
        await expect(page.getByTestId('product-specs').getByTestId('spec-row')).toHaveCount(5);

    })
    test("Add product to cart from product detail page", async ({page})=>{
        const firstProductLocator = page.getByTestId('product-name').first();
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
    
    test("Validate add to favourite functionality", async ({page})=>{
        const firstProductLocator = page.getByTestId('product-name').first();
        await firstProductLocator.click();

        await page.waitForURL("**/product/**");
        await expect(page.getByTestId('product-name')).toBeVisible();
        const productName = await page.getByTestId('product-name').innerText();
        await page.getByTestId('add-to-favorites').click();
        if(await page.getByTestId('nav-sign-in').isVisible()){
            await expect(page.getByRole('alert',{name:' Unauthorized, can not add product to your favorite list. '})).toBeVisible();
        }else{
            await expect(page.getByRole('alert',{name:'Product added to your favorite list.'})).toBeVisible();
        }
    })
})