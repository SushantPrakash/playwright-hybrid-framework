import {test, expect} from '@fixtures/base.fixture.js';
import { Setup } from '@utils/constant.js';
import { getEnv } from '@utils/env.js';


test.describe("Login Test Scenarios",()=>{
    test.beforeEach(async ({basePage, header})=>{
        await basePage.open(Setup.UI_BASE_URL);
        await header.goToSignInPage();

    })

    test("Validate login using valid credentials", async ({page,loginPage})=>{
        await loginPage.login(getEnv('JANE_DOE'), getEnv('PASSWORD'));
        await expect(page.getByTestId('page-title')).toHaveText('My account');
    })

    test("Validate invalid login using wrong credentials", async ({page, loginPage})=>{
        await loginPage.login("customer6@practicesoftwaretesting.com","passKey123");
        await expect(loginPage.errorMessage).toHaveText('Invalid email or password');
    })
})