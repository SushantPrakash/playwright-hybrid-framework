import {test, expect} from '@fixtures/base.fixture.js';
import { GuestUserDetails } from '@test_data/guestUser.js';
import test_data from '@test_data/test_data.json' with {type: 'json'};
import { Setup } from '@utils/constant.js';
import { getEnv } from '@utils/env.js';




test.describe("Cart and Checkout Test Scenarios",()=>{
    test.beforeEach(async ({basePage})=>{
        await basePage.open(Setup.UI_BASE_URL);
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
        const country = test_data.address_data.country;
        const pincode = test_data.address_data.postcode;
        const house = test_data.address_data.house;
        await checkout.billingAddress.enterBillingAddressDetails(country,pincode,house)
        await checkout.clickProceedToCheckoutBtn();
        await checkout.paymentSection.makePayment(Setup.COD);
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
        await checkout.signInSection.loginUser(getEnv('JACK_HOWE'), getEnv('PASSWORD'));
        await checkout.clickProceedToCheckoutBtn();
        await checkout.billingAddress.enterBillingAddressDetails(
            test_data.address_data.country,
            test_data.address_data.postcode,
            test_data.address_data.house
        )
        await checkout.clickProceedToCheckoutBtn();
        const cardDetails={
            cardNumber: test_data.credit_card_details.cardNumber,
            expiryDate: test_data.credit_card_details.expiryDate,
            cvvNum: test_data.credit_card_details.cvvNum,
            cardHolderName: test_data.credit_card_details.cardHolderName
        }
        await checkout.paymentSection.makePayment(Setup.Credit_Card,cardDetails);
        await checkout.orderConfirmationSuccessMsg();
    })
})