import { expect, type Locator, type Page} from '@playwright/test';

export class LoginPage{
    readonly page: Page
    readonly loginHeading: Locator;
    readonly emailInputBox: Locator;
    readonly passwordInputBox: Locator;
    readonly loginBtn: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page){
        this.page = page;
        this.loginHeading = page.getByRole('heading',{name: 'Login'});
        this.emailInputBox = page.getByTestId('email');
        this.passwordInputBox = page.getByTestId('password');
        this.loginBtn = page.getByRole('button',{name: 'Login'});
        this.errorMessage = page.getByTestId('login-error');

    }

    async enterEmail(email:string){
        await expect(this.loginHeading).toBeVisible();
        await this.emailInputBox.fill(email);
    }
    async enterPassword(password:string){
        await expect(this.loginHeading).toBeVisible();
        await this.passwordInputBox.fill(password);
    }
    async clickLoginBtn(){
        await expect(this.loginHeading).toBeVisible();
        await this.loginBtn.click();
    }

    async login(email: string, password: string){
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.clickLoginBtn();
    }
    async getErrorMessage(){
        return this.errorMessage;
    }

}