import {test, expect} from '@fixtures/base.fixture.js';
import { faker } from '@faker-js/faker';


test.describe("Cart and Checkout Test Scenarios",()=>{
    test.beforeEach(async ({basePage})=>{
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
        const address = {
            country:"United States of America (the)",
            pincode:"10011",
            house:"23"
        }
        await checkout.billingAddress.enterBillingAddressDetails(address)
        await checkout.clickProceedToCheckoutBtn();
        await checkout.paymentSection.makePayment('Cash On Delivery');
        await checkout.orderConfirmationSuccessMsg();
        
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
        const email = "customer@practicesoftwaretesting.com";
        const password = "welcome01";
        await checkout.signInSection.loginUser(email,password);
        await checkout.clickProceedToCheckoutBtn();
        const address = {
            country:"India",
            pincode:"222221",
            house:"23"
        }
        await checkout.billingAddress.enterBillingAddressDetails(address)
        await checkout.clickProceedToCheckoutBtn();
        const cardDetails={
            cardNumber: "1212-1313-1414-1111",
            expiryDate: "03/2030",
            cvvNum: "234",
            cardHolderName: "Jason Mamoa"
        }
        await checkout.paymentSection.makePayment('Credit Card',cardDetails);
        await checkout.orderConfirmationSuccessMsg();
    })
})