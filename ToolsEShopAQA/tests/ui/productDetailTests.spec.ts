import {test, expect} from "@playwright/test";
import { BasePage } from '../../src/pages/basePage.js'
import { ProductDetailPage } from '../../src/pages/productDetailPage.js'
import { ProductListingPage } from '../../src/pages/productListingPage.js'
import { HeaderSection } from '../../src/pages/headerSection.js'

test.describe("Product Detail Test Scenarios",()=>{
    test.beforeEach(async ({page})=>{
        const basePage = new BasePage(page);
        await basePage.open("https://practicesoftwaretesting.com/");
    })

    test("Validate product detail is displayed", async ({page})=>{
        const plp = new ProductListingPage(page);
        const pdp = new ProductDetailPage(page);
        const productName = "Combination Pliers";
        const productPrice = await plp.getProductPrice(productName);        
        await plp.clickOnProduct(productName);
        await pdp.validateProductDetail(productName, productPrice);
        
    })
    test("Add product to cart from product detail page", async ({page})=>{
        const plp = new ProductListingPage(page);
        const pdp = new ProductDetailPage(page);
        const headerSection = new HeaderSection(page);
        const productName = "Combination Pliers";
        await plp.clickOnProduct(productName);
        await pdp.addToCart();
        await pdp.addToCartAlertIsVisible();
        await headerSection.cartIconDisplaysProductAdded();

    })
    
})