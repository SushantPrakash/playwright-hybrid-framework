import { expect, type Locator, type Page } from '@playwright/test';

export class Guest{
    readonly page: Page;
    readonly guestEmail: Locator;
    readonly guestFirstName: Locator;
    readonly guestLastName: Locator;
    readonly guestContinueBtn: Locator;
    readonly proceedToCheckOut: Locator;


    constructor(page: Page){
        this.page = page;
        this.guestEmail = page.getByTestId('guest-email');
        this.guestFirstName = page.getByTestId('guest-first-name');
        this.guestLastName = page.getByTestId('guest-last-name');
        this.guestContinueBtn = page.getByRole('button',{name:'Continue as Guest'});
        this.proceedToCheckOut = page.getByRole('button',{name:'Proceed to checkout'});
    }

    async enterGuestDetails(email: string, firstName: string, lastName: string){
        await this.guestEmail.fill(email);
        await this.guestFirstName.fill(firstName);
        await this.guestLastName.fill(lastName);
    }

    async clickContinueAsGuest(){
        await this.guestContinueBtn.click();
    }

    async validateGuestSuccessMsg(email: string, firstName: string, lastName: string){
        await expect(this.page.getByText(`Continuing as guest: ${firstName} ${lastName} (${email})`)).toBeVisible();
    }

    // async proceedToBillingAddress(){
    //     await this.proceedToCheckOut.click();
    // }
}