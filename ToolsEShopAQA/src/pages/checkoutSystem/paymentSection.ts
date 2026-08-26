import {expect, type Locator, type Page} from '@playwright/test';
import { CashOnDeliveryPayment } from './paymentStrategy/cod.payment.js';
import { CreditCardPayment, type CreditCardDetails } from './paymentStrategy/creditCard.payment.js';

export class PaymentSection{
    readonly confirmPaymentBtn: Locator;
    readonly paymentSuccessMsg: Locator;

    constructor(private page: Page){
        this.paymentSuccessMsg = page.getByTestId('payment-success-message');
        this.confirmPaymentBtn = page.getByTestId('finish');
    }

    async makePayment(paymentType: string, details?:CreditCardDetails){
        switch(paymentType.toLowerCase()){
            case 'cash on delivery':
                new CashOnDeliveryPayment(this.page).pay();
                break;
            case 'credit card':
                new CreditCardPayment(this.page, details as CreditCardDetails).pay();
                break;
        }
        await this.confirmPaymentBtn.click();
        await this.paymentSuccessMsg.waitFor({state: 'visible'});
        await expect(this.paymentSuccessMsg).toContainText('Payment was successful');
        await this.confirmPaymentBtn.click();
    }

}