import {test, expect} from '@playwright/test';
import { faker } from '@faker-js/faker';
import { BasePage } from '../../src/pages/basePage.js'
import { ProductDetailPage } from '../../src/pages/productDetailPage.js'
import { ProductListingPage } from '../../src/pages/productListingPage.js'
import { HeaderSection } from '../../src/pages/headerSection.js';
import { CheckoutPage } from '../../src/pages/checkoutSystem/checkoutPage.js'

test.describe("Cart and Checkout Test Scenarios",()=>{
    test.beforeEach(async ({page})=>{
        const basePage = new BasePage(page);
        await basePage.open("https://practicesoftwaretesting.com/");
    })

    test('Add product to Cart', async({page})=>{
        const plp = new ProductListingPage(page);
        const pdp = new ProductDetailPage(page);
        const headerSection = new HeaderSection(page);
        const checkout = new CheckoutPage(page);
        const productName = "Combination Pliers";
        let itemPrice = await plp.getProductPrice(productName);
        await plp.clickOnProduct(productName);
        await pdp.validateProductDetail(productName,itemPrice);
        await pdp.addToCart();
        await pdp.addToCartAlertIsVisible();
        await headerSection.cartIconDisplaysProductAdded();
        await headerSection.gotToCart();
        await checkout.cart.validateCorrectProductIsAdded(productName,itemPrice);
    })
    
    test("Update quantity of product in cart", async ({page})=>{
        const plp = new ProductListingPage(page);
        const pdp = new ProductDetailPage(page);
        const headerSection = new HeaderSection(page);
        const checkout = new CheckoutPage(page);
        const productName = "Combination Pliers";
        let itemPrice = await plp.getProductPrice(productName);
        await plp.clickOnProduct(productName);
        await pdp.validateProductDetail(productName,itemPrice);
        await pdp.addToCart();
        await pdp.addToCartAlertIsVisible();
        await headerSection.cartIconDisplaysProductAdded();
        await headerSection.gotToCart();
        await checkout.cart.validateCorrectProductIsAdded(productName,itemPrice);
        await checkout.cart.updateQuantity(2);
        await expect(checkout.cart.productQuantity).toHaveValue('2');
    })
    test("Remove product from cart", async ({page})=>{
        const plp = new ProductListingPage(page);
        const pdp = new ProductDetailPage(page);
        const headerSection = new HeaderSection(page);
        const checkout = new CheckoutPage(page);
        const productName = "Combination Pliers";
        let itemPrice = await plp.getProductPrice(productName);
        await plp.clickOnProduct(productName);
        await pdp.validateProductDetail(productName,itemPrice);
        await pdp.addToCart();
        await pdp.addToCartAlertIsVisible();
        await headerSection.cartIconDisplaysProductAdded();
        await headerSection.gotToCart();
        await checkout.cart.validateCorrectProductIsAdded(productName,itemPrice);
        await checkout.cart.deleteProductFromCart();
    })
    test("Validate guest checkout process", async ({page})=>{
        const plp = new ProductListingPage(page);
        const pdp = new ProductDetailPage(page);
        const headerSection = new HeaderSection(page);
        const checkout = new CheckoutPage(page);

        const productName = "Combination Pliers";
        let itemPrice = await plp.getProductPrice(productName);
        await plp.clickOnProduct(productName);
        await pdp.validateProductDetail(productName,itemPrice);
        await pdp.addToCart();
        await pdp.addToCartAlertIsVisible();
        await headerSection.cartIconDisplaysProductAdded();
        await headerSection.gotToCart();
        await checkout.cart.validateCorrectProductIsAdded(productName,itemPrice);
        await checkout.clickProceedToCheckoutBtn();
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const buyerEmail = faker.internet.email({ firstName, lastName });
        await checkout.signInSection.continueAsGuest(buyerEmail,firstName,lastName);
        await checkout.clickProceedToCheckoutBtn();
        await checkout.billingAddress.enterBillingAddressDetails(
            "United States of America (the)",
            "10011",
            "23"
        )
        await checkout.clickProceedToCheckoutBtn();
        await checkout.paymentSection.makePayment('Cash On Delivery');
        await checkout.orderConfirmationSuccessMsg();
        
        // const orderConfirmationText = await page.locator('#order-confirmation').innerText();
        // expect(orderConfirmationText).toContain('Thanks for your order! Your invoice number is');

    })
    test.only("Validate login checkout process", async ({page})=>{
        const plp = new ProductListingPage(page);
        const pdp = new ProductDetailPage(page);
        const headerSection = new HeaderSection(page);
        const checkout = new CheckoutPage(page);

        const productName = "Combination Pliers";
        let itemPrice = await plp.getProductPrice(productName);
        await plp.clickOnProduct(productName);
        await pdp.validateProductDetail(productName,itemPrice);
        await pdp.addToCart();
        await pdp.addToCartAlertIsVisible();
        await headerSection.cartIconDisplaysProductAdded();
        await headerSection.gotToCart();
        await checkout.cart.validateCorrectProductIsAdded(productName,itemPrice);
        await checkout.clickProceedToCheckoutBtn();
        const email = "customer2@practicesoftwaretesting.com";
        const password = "welcome01";
        await checkout.signInSection.loginUser(email,password);
        await checkout.clickProceedToCheckoutBtn();
        await checkout.billingAddress.enterBillingAddressDetails(
            "United States of America (the)",
            "10011",
            "23"
        )
        await checkout.clickProceedToCheckoutBtn();
        await checkout.paymentSection.makePayment('Cash On Delivery');
        await checkout.orderConfirmationSuccessMsg();
    })
})