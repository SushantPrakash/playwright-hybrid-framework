import {test, expect} from '@fixtures/base.fixture.js';

test.describe("Login Test Scenarios",()=>{
    test.beforeEach(async ({basePage, header})=>{
        await basePage.open("https://practicesoftwaretesting.com/");
        await header.goToSignInPage();

    })

    test("Validate login using valid credentials", async ({page,loginPage})=>{
        await loginPage.login("customer@practicesoftwaretesting.com","welcome01");
        await expect(page.getByTestId('page-title')).toHaveText('My account');
    })

    test("Validate invalid login using wrong credentials", async ({page, loginPage})=>{
        await loginPage.login("customer6@practicesoftwaretesting.com","passKey123");
        await expect(loginPage.errorMessage).toHaveText('Invalid email or password');
    })
})