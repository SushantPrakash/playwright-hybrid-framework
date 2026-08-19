import {test, expect} from '@playwright/test';
import { BasePage } from '../../src/pages/basePage.js';
import {LoginPage} from '../../src/pages/loginPage.js';
import {HeaderSection} from '../../src/pages/headerSection.js';

test.describe("Login Test Scenarios",()=>{
    test.beforeEach(async ({page})=>{
        const basePage = new BasePage(page);
        await basePage.open("https://practicesoftwaretesting.com/");
        const headerSection = new HeaderSection(page);
        await headerSection.goToSignInPage();

    })

    test("Validate login using valid credentials", async ({page})=>{
        const login = new LoginPage(page);
        await login.login("customer@practicesoftwaretesting.com","welcome01");
        await expect(page.getByTestId('page-title')).toHaveText('My account');
    })

    test("Validate invalid login using wrong credentials", async ({page})=>{
        const login = new LoginPage(page);
        await login.login("customer6@practicesoftwaretesting.com","passKey123");
        await expect(login.errorMessage).toHaveText('Invalid email or password');
    })
})