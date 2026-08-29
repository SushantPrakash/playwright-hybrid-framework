import {expect, type Locator, type Page} from '@playwright/test';

type Address ={
    country: string;
    pincode: string;
    house: string;
}

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

    async enterBillingAddressDetails(address:Address){
        
        await expect(this.country).toBeEnabled();
        await this.country.click();
        await this.country.selectOption(address.country,{timeout:2000});
        await this.zipCode.fill(address.pincode,{timeout:2000});
        await this.houseNumber.fill(address.house,{timeout:2000});
        await expect(this.state).not.toBeEmpty();
        
    }
}