import {expect, type Locator, type Page} from '@playwright/test';
import { AddressBuilder } from '../../test_data/addressBuilder.js';


export class BillingAddress{
    readonly addressBuilder: AddressBuilder;
    readonly page: Page;
    readonly country: Locator;
    readonly zipCode: Locator;
    readonly houseNumber: Locator;
    readonly streetName: Locator;
    readonly city: Locator;
    readonly state: Locator;


    constructor(page: Page){
        this.page = page;
        this.addressBuilder = new AddressBuilder();
        this.country = page.getByTestId('country');
        this.zipCode = page.getByTestId('postal_code')
        this.houseNumber = page.getByTestId('house_number');
        this.streetName = page.getByTestId('street');
        this.city = page.getByTestId('city');
        this.state = page.getByTestId('state');  
    }

    async enterBillingAddressDetails(country: string, postalCode: number, house: number){
        const address = await this.addressBuilder.getAddressFromAPIFor(country,postalCode,house);
        await expect(this.country).toBeEnabled();
        await this.streetName.fill(address.street,{timeout:2000});
        await this.city.fill(address.city,{timeout:2000});
        await this.state.fill(address.state,{timeout:2000});
        await this.country.click();
        await this.country.selectOption(country,{timeout:2000});
        await this.zipCode.fill(postalCode.toString(),{timeout:2000});
        // const lookup = this.page.waitForResponse(
        //     res => res.url().includes('/postcode-lookup') && res.ok()
        // );
        await this.houseNumber.fill(house.toString(),{timeout:2000});
        // await lookup;
        await this.page.getByTestId('postcode-lookup-loading').waitFor({state: 'detached'});
        
    }
}