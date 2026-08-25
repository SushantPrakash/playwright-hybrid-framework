import {test, expect} from '../../src/fixtures/pages.fixture.js';
import { BasePage } from '../../src/pages/basePage.js'

test.describe("Product Detail Test Scenarios",()=>{
    test.beforeEach(async ({page})=>{
        const basePage = new BasePage(page);
        await basePage.open("https://practicesoftwaretesting.com/");
    })

    test("Validate product detail is displayed", async ({pdp, plp})=>{
        const productName = "Combination Pliers";
        const productPrice = await plp.getProductPrice(productName);        
        await plp.clickOnProduct(productName);
        await pdp.validateProductDetail(productName, productPrice);
        
    })
    test("Add product to cart from product detail page", async ({plp,pdp,header})=>{
        const productName = "Combination Pliers";
        await plp.clickOnProduct(productName);
        await pdp.addToCart();
        await pdp.addToCartAlertIsVisible();
        await header.cartIconDisplaysProductAdded();

    })
    
})