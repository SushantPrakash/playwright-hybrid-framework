import { type Locator, type Page} from '@playwright/test';
import type { IPaymentStrategy } from './IPaymentStrategy.js';

export interface CreditCardDetails {
    cardNumber: string;
    expiryDate: string;
    cvvNum: string;
    cardHolderName: string;
}

export class CreditCardPayment implements IPaymentStrategy{
    readonly page: Page;
    readonly paymentType: Locator;
    readonly confirmPaymentBtn: Locator;
    readonly creditCardNumber: Locator;
    readonly expirateDate: Locator;
    readonly cvv: Locator;
    readonly cardHolderName: Locator;

    constructor(page: Page, private creditCardDetails: CreditCardDetails){
        this.page = page;
        this.paymentType = page.getByTestId('payment-method');
        this.confirmPaymentBtn = page.getByTestId('finish');
        this.creditCardNumber = page.getByTestId('credit_card_number');
        this.expirateDate = page.getByTestId('expiration_date');
        this.cvv = page.getByTestId('cvv');
        this.cardHolderName = page.getByTestId('card_holder_name');
        this.creditCardDetails = creditCardDetails;
    }

    async pay(): Promise<void>{
        await this.paymentType.click();
        await this.paymentType.selectOption('Credit Card');
        await this.creditCardNumber.fill(this.creditCardDetails.cardNumber);
        await this.expirateDate.fill(this.creditCardDetails.expiryDate);
        await this.cvv.fill(this.creditCardDetails.cvvNum);
        await this.cardHolderName.fill(this.creditCardDetails.cardHolderName);
        
    }
}