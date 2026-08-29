import {expect, type Locator, type Page} from '@playwright/test';
import { BillingAddress } from './billingAddressSection.js';
import { Cart } from './cartSection.js';
import { SignInSection } from './signInSection/signInSection.js';
import { PaymentSection } from './paymentSection.js';

export class CheckoutPage{
    readonly page:Page;
    readonly signInSection: SignInSection;
    readonly cart: Cart;
    readonly paymentSection: PaymentSection;
    readonly billingAddress: BillingAddress;
    readonly proceedToCheckoutBtn: Locator;
    readonly orderConfirmMsg: Locator;

    constructor(page: Page){
        this.page = page;
        this.signInSection = new SignInSection(page);
        this.billingAddress = new BillingAddress(page);
        this.cart = new Cart(page);
        this.paymentSection = new PaymentSection(page);
        this.proceedToCheckoutBtn = page.getByRole('button',{name:'Proceed to checkout '});
        this.orderConfirmMsg = page.locator('#order-confirmation');
    }
    
    async clickProceedToCheckoutBtn(){
        await expect(this.proceedToCheckoutBtn).toBeEnabled();
        await this.proceedToCheckoutBtn.click();
    }

    async orderConfirmationSuccessMsg(){
        await this.orderConfirmMsg.waitFor({state:'attached'});
        await expect(this.orderConfirmMsg).toHaveText(/Thanks for your order! Your invoice number is.*/);
    }
}