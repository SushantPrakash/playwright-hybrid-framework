import {test,expect} from '@playwright/test';
import { ProductListingPage } from '../../src/pages/productListingPage.js';
import { BasePage } from '../../src/pages/basePage.js'

test.describe("Product Listing Test Scenarios",()=>{
    test.beforeEach(async ({page})=>{
        const basePage = new BasePage(page);
        await basePage.open("https://practicesoftwaretesting.com/");
    })

    test("Validate Product grid is displayed", async ({page})=>{
        const plp = new ProductListingPage(page);
        let productNames = await plp.getProductsNames();
        expect(productNames.length).toBeGreaterThan(0);
        productNames.forEach((prodName)=>{
            expect(prodName.trim()).not.toBe('');
        })
        await expect(page.locator(".grid-title")).toHaveCount(4);
    })

    test("Validate search product functionality", async ({page})=>{
        const plp = new ProductListingPage(page);
        let returnedProducts = await plp.searchForToolUsingSearchBox("Hammer");
        expect(returnedProducts.length).toBeGreaterThan(0);
        returnedProducts.forEach((prod)=>{
            expect(prod.toLowerCase()).toContain('hammer');
        }) 
    })
    test("Validate product filter by brand functionality", async ({page})=>{
        const plp = new ProductListingPage(page);
        let productNamesBeforeFilter = await plp.getProductsNames();
        let returnedProducts = await plp.applyFilter("brand")
        expect(returnedProducts.length).toBeGreaterThan(0);
        returnedProducts.forEach((prod)=>{
            expect(prod.toLowerCase()).not.toBe('');
        })
        expect(returnedProducts).not.toEqual(productNamesBeforeFilter);

    })
    test("Validate pagination functionality", async({page})=>{
        const plp = new ProductListingPage(page);
        let productsBeforePageBtnClick = await plp.getProductsNames();
        let productsAfterPageBtnClick = await plp.goToDifferentPage(2);
        expect(productsAfterPageBtnClick.length).toBeGreaterThan(0);
        productsAfterPageBtnClick.forEach((prod)=>{
            expect(prod.toLowerCase()).not.toBe('');
        })
        expect(productsAfterPageBtnClick).not.toEqual(productsBeforePageBtnClick);
    })

    test("Validate price range slider", async ({page})=>{
        const plp = new ProductListingPage(page);
        let productNamesBeforeSliderMove = await plp.getProductsNames();
        let productNamesAfterSliderMove = await plp.moveSliderToXOffset(96);
        expect(productNamesAfterSliderMove).not.toEqual(productNamesBeforeSliderMove);
    })
})