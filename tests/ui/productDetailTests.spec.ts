import {test, expect} from '@fixtures/base.fixture.js';

test.describe("Product Detail Test Scenarios",()=>{
    test.beforeEach(async ({basePage})=>{
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