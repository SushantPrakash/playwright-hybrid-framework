import {test, expect} from '@fixtures/base.fixture.js';
import { faker } from '@faker-js/faker';
import { GuestUserDetails } from '../../src/test_data/guestUser.js';
import {AddressAPIClient} from '@api/addressLookupApi.js'
import test_data from '../../src/test_data/test_data.json' with {type: 'json'};


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
        const guestUser = new GuestUserDetails();
        await checkout.signInSection.continueAsGuest(guestUser.guestUser());
        await checkout.clickProceedToCheckoutBtn();
        const country = "United States of America (the)";
        const pincode = 222112;
        const house = 56;
        await checkout.billingAddress.enterBillingAddressDetails(country,pincode,house)
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
        const email = "customer2@practicesoftwaretesting.com";
        const password = "welcome01";
        await checkout.signInSection.loginUser(email,password);
        await checkout.clickProceedToCheckoutBtn();
        const country = "United States of America (the)";
        await checkout.billingAddress.enterBillingAddressDetails(country,10011,47)
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