import {test, expect} from '@playwright/test';

test.describe("Login Test Scenarios",()=>{
    test.beforeEach(async ({page})=>{
        page.goto("https://practicesoftwaretesting.com/");
    })

    test("Validate Landing Page when not logged in",async ({page})=>{
        await expect(page.getByTitle("Practice Software Testing - Toolshop")).toBeVisible();
    })

    test("Validate login using valid credentials", async ({page})=>{
        await page.getByTestId("nav-sign-in").click();
        await expect(page.getByRole('heading',{name:'Login'})).toBeVisible();
        await page.getByTestId('email').fill("customer3@practicesoftwaretesting.com");
        await page.getByTestId('password').fill("pass123");
        await page.getByTestId('login-submit').click();
        await expect(page.getByTestId('page-title')).toHaveText('My account');
    })

    test("Validate invalid login using wrong credentials", async ({page})=>{
        await page.getByTestId("nav-sign-in").click();
        await expect(page.getByRole('heading',{name:'Login'})).toBeVisible();
        await page.getByTestId('email').fill("customer4@practicesoftwaretesting.com");
        await page.getByTestId('password').fill("passKey123");
        await page.getByTestId('login-submit').click();
        await expect(page.getByTestId('login-error')).toHaveText('Invalid email or password');
    })
})