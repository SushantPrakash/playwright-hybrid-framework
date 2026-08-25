import {expect, type Locator, type Page} from '@playwright/test';

export class BillingAddress{
    readonly page: Page;
    readonly country: Locator;
    readonly zipCode: Locator;
    readonly houseNumber: Locator;
    readonly streetName: Locator;
    readonly city: Locator;
    readonly state: Locator;


    constructor(page: Page){
        this.page = page;
        this.country = page.getByTestId('country');
        this.zipCode = page.getByTestId('postal_code')
        this.houseNumber = page.getByTestId('house_number');
        this.streetName = page.getByTestId('street');
        this.city = page.getByTestId('city');
        this.state = page.getByTestId('state');  
    }

    async enterBillingAddressDetails(country: string, zipCode: string, houseNumber: string){
        await expect(this.country).toBeEnabled();
        await this.country.selectOption(country);
        await this.zipCode.pressSequentially(zipCode);
        await this.zipCode.press('Tab');
        await this.houseNumber.pressSequentially(houseNumber);
        await this.zipCode.press('Tab');
        }
}