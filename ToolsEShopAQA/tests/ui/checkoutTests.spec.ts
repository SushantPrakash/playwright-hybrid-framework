import {test, expect} from '../../src/fixtures/pages.fixture.js';
import { faker } from '@faker-js/faker';
import { BasePage } from '../../src/pages/basePage.js'


test.describe("Cart and Checkout Test Scenarios",()=>{
    test.beforeEach(async ({page})=>{
        const basePage = new BasePage(page);
        await basePage.open("https://practicesoftwaretesting.com/");
    })

    test('Add product to Cart', async({plp,pdp,header,checkout})=>{
        
        const productName = "Combination Pliers";
        let itemPrice = await plp.getProductPrice(productName);
        await plp.clickOnProduct(productName);
        await pdp.validateProductDetail(productName,itemPrice);
        await pdp.addToCart();
        await pdp.addToCartAlertIsVisible();
        await header.cartIconDisplaysProductAdded();
        await header.gotToCart();
        await checkout.cart.validateCorrectProductIsAdded(productName,itemPrice);
    })
    
    test("Update quantity of product in cart", async ({plp,pdp,header,checkout})=>{
        
        const productName = "Combination Pliers";
        let itemPrice = await plp.getProductPrice(productName);
        await plp.clickOnProduct(productName);
        await pdp.validateProductDetail(productName,itemPrice);
        await pdp.addToCart();
        await pdp.addToCartAlertIsVisible();
        await header.cartIconDisplaysProductAdded();
        await header.gotToCart();
        await checkout.cart.validateCorrectProductIsAdded(productName,itemPrice);
        await checkout.cart.updateQuantity(2);
        await expect(checkout.cart.productQuantity).toHaveValue('2');
    })
    test("Remove product from cart", async ({plp,pdp,header,checkout})=>{
        const productName = "Combination Pliers";
        let itemPrice = await plp.getProductPrice(productName);
        await plp.clickOnProduct(productName);
        await pdp.validateProductDetail(productName,itemPrice);
        await pdp.addToCart();
        await pdp.addToCartAlertIsVisible();
        await header.cartIconDisplaysProductAdded();
        await header.gotToCart();
        await checkout.cart.validateCorrectProductIsAdded(productName,itemPrice);
        await checkout.cart.deleteProductFromCart();
    })
    test("Validate guest checkout process", async ({plp,pdp,header,checkout})=>{
       
        const productName = "Combination Pliers";
        let itemPrice = await plp.getProductPrice(productName);
        await plp.clickOnProduct(productName);
        await pdp.validateProductDetail(productName,itemPrice);
        await pdp.addToCart();
        await pdp.addToCartAlertIsVisible();
        await header.cartIconDisplaysProductAdded();
        await header.gotToCart();
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
    test("Validate login checkout process", async ({plp,pdp,header,checkout})=>{
        
        const productName = "Combination Pliers";
        let itemPrice = await plp.getProductPrice(productName);
        await plp.clickOnProduct(productName);
        await pdp.validateProductDetail(productName,itemPrice);
        await pdp.addToCart();
        await pdp.addToCartAlertIsVisible();
        await header.cartIconDisplaysProductAdded();
        await header.gotToCart();
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