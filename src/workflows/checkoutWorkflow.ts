import { type Page} from '@playwright/test';

import { CheckoutPage } from '@checkout/checkoutPage.js';
import { BillingAddress } from '@checkout/billingAddressSection.js';
import { Cart } from '@checkout/cartSection.js';
import { PaymentSection } from '@checkout/paymentSection.js'
import { HeaderSection } from '@pages/headerSection.js';
import { GuestUserDetails } from '../test_data/guestUser.js';


export class CheckoutFlow{
    readonly checkout: CheckoutPage;
    readonly billingAddress: BillingAddress;
    readonly cart: Cart;
    readonly payment: PaymentSection;
    readonly header: HeaderSection;

    constructor(page:Page){
        this.checkout = new CheckoutPage(page);
        this.billingAddress = new BillingAddress(page);
        this.cart = new Cart(page);
        this.payment = new PaymentSection(page);
        this.header = new HeaderSection(page);
    }

    async checkoutProcess(){
        const guestUser = new GuestUserDetails();
        await this.checkout.signInSection.continueAsGuest(guestUser.guestUser());
        await this.checkout.clickProceedToCheckoutBtn();
        await this.checkout.billingAddress.enterBillingAddressDetails('India',222212,47)
        await this.checkout.clickProceedToCheckoutBtn();
        await this.checkout.paymentSection.makePayment('Cash On Delivery');
    }
}