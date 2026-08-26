import { type Locator, type Page } from '@playwright/test';
import { type IPaymentStrategy } from './IPaymentStrategy.js';

export class CashOnDeliveryPayment implements IPaymentStrategy{
    readonly page: Page;
    readonly paymentType: Locator;
    // readonly confirmPaymentBtn: Locator;


    constructor(page: Page){
        this.page = page;
        this.paymentType = page.getByTestId('payment-method');
        // this.confirmPaymentBtn = page.getByTestId('finish');

    }
    async pay(): Promise<void>{
        // await this.paymentType.click();
        await this.paymentType.selectOption('Cash on Delivery');
        // await this.confirmPaymentBtn.click();
        // await this.paymentSuccessMsg.waitFor({state: 'visible'});
        // await expect(this.paymentSuccessMsg).toContainText('Payment was successful');
        // await this.confirmPaymentBtn.click();     
    }
}