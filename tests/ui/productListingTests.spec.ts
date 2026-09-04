import {test, expect} from '@fixtures/base.fixture.js';
import { Setup } from '@utils/constant.js';

test.describe("Product Listing Test Scenarios",()=>{
    test.beforeEach(async ({basePage})=>{
        await basePage.open(Setup.UI_BASE_URL);
    })

    test("Validate Product grid is displayed", async ({page,plp})=>{
        let productNames = await plp.getProductsNames();
        expect(productNames.length).toBeGreaterThan(0);
        productNames.forEach((prodName)=>{
            expect(prodName.trim()).not.toBe('');
        })
        await expect(page.locator(".grid-title")).toHaveCount(4);
    })

    test("Validate search product functionality", async ({plp})=>{
        let returnedProducts = await plp.searchForToolUsingSearchBox("Hammer");
        expect(returnedProducts.length).toBeGreaterThan(0);
        returnedProducts.forEach((prod)=>{
            expect(prod.toLowerCase()).toContain('hammer');
        }) 
    })
    test("Validate product filter by brand functionality", async ({plp})=>{
        let productNamesBeforeFilter = await plp.getProductsNames();
        let returnedProducts = await plp.applyFilter("brand")
        expect(returnedProducts.length).toBeGreaterThan(0);
        returnedProducts.forEach((prod)=>{
            expect(prod.toLowerCase()).not.toBe('');
        })
        expect(returnedProducts).not.toEqual(productNamesBeforeFilter);

    })
    test("Validate pagination functionality", async({plp})=>{
        let productsBeforePageBtnClick = await plp.getProductsNames();
        let productsAfterPageBtnClick = await plp.goToDifferentPage(2);
        expect(productsAfterPageBtnClick.length).toBeGreaterThan(0);
        productsAfterPageBtnClick.forEach((prod)=>{
            expect(prod.toLowerCase()).not.toBe('');
        })
        expect(productsAfterPageBtnClick).not.toEqual(productsBeforePageBtnClick);
    })

    test("Validate price range slider", async ({plp})=>{
        let productNamesBeforeSliderMove = await plp.getProductsNames();
        let productNamesAfterSliderMove = await plp.moveSliderToXOffset(96);
        expect(productNamesAfterSliderMove).not.toEqual(productNamesBeforeSliderMove);
    })
})