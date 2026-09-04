import { expect, request, test} from '@playwright/test';
import { LoginAPIClient } from '@api/loginApi.js';
import { getEnv } from '@utils/env.js';


test('Valid Login', async()=>{
    const loginAPI = new LoginAPIClient();
    const response = await loginAPI.loginAs(
        getEnv('JANE_DOE'),
        getEnv('PASSWORD'));
    expect(response.ok()).toBeTruthy();
});

test('Invalid Login', async()=>{
    const loginAPI = new LoginAPIClient();
    const response = await loginAPI.loginAs(
        "testUser@get.com",
        "testPwd123");
    expect(response.ok()).not.toBeTruthy();
})