import {expect, type Locator, type Page} from '@playwright/test';
import { Guest } from './guest.js';
import { Login } from './checkoutLogin.js';
import type { GuestUser } from '../../../test_data/guestUser.js';

export class SignInSection{
    readonly page: Page;
    readonly signInTab: Locator;
    readonly guestTab: Locator;
    readonly login: Login;
    readonly guest: Guest;

    constructor(page: Page){
        this.page = page;
        this.signInTab = page.getByRole('tab',{name:'Sign in'});
        this.guestTab = page.getByRole('tab',{name:'Continue as Guest'});
        this.login = new Login(page);
        this.guest = new Guest(page);
    }

    async loginUser(email: string, password: string){
        await this.signInTab.click();
        await this.page.waitForLoadState('networkidle');
        await expect(this.login.emailInputBox).toBeVisible();
        await this.login.enterEmail(email);
        await this.login.enterPassword(password);
        await this.login.clickLoginBtn();
        await this.login.validateLoginSuccessMsg();
    }
    async continueAsGuest(guestUser: GuestUser){
        await this.guestTab.click();
        await this.page.waitForLoadState('networkidle');
        await expect(this.guest.guestEmail).toBeVisible();
        await this.guest.enterGuestDetails(guestUser.firstName, guestUser.lastName, guestUser.email);
        await this.guest.clickContinueAsGuest();
        await this.guest.validateGuestSuccessMsg(guestUser.firstName, guestUser.lastName, guestUser.email);
    }
}