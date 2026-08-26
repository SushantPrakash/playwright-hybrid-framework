import { expect, type Page } from '@playwright/test';
import { LoginPage } from '../../loginPage.js';
//should use API login for this step, but for now using UI login to validate the login functionality
export class Login extends LoginPage {
    constructor(page: Page) {
        super(page);
    }

    async validateLoginSuccessMsg(){
        await expect(this.page.getByText('you are already logged in. You can proceed to checkout.')).toBeVisible();
        
    }
}