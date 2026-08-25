import {expect, type Locator, type Page} from '@playwright/test';

export class PaymentSection{
    readonly page: Page;
    readonly paymentType: Locator;
    readonly confirmPaymentBtn: Locator;
    readonly paymentSuccessMsg: Locator;

    constructor(page: Page){
        this.page = page;
        this.paymentSuccessMsg = page.getByTestId('payment-success-message');
        this.confirmPaymentBtn = page.getByTestId('finish');
        this.paymentType = page.getByTestId('payment-method');
    }

    async makePayment(paymentType: string){
        await this.paymentType.click();
        switch(paymentType.toLowerCase()){
            case 'cash on delivery':
                await this.paymentType.selectOption('Cash on Delivery');
            default:
                await this.paymentType.selectOption('Cash on Delivery');
        }
        await this.confirmPaymentBtn.click();
        await this.paymentSuccessMsg.waitFor({state: 'visible'});
        await expect(this.paymentSuccessMsg).toContainText('Payment was successful');
        await this.confirmPaymentBtn.click();
    }

}