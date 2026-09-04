import { request, type APIResponse } from '@playwright/test';
import path from 'path';
import { Setup } from '@utils/constant.js';


export class LoginAPIClient{
    
    async loginAs(userEmail: string, userPassword: string){
        const loginContext = await request.newContext({
            baseURL: Setup.API_BASE_URL,
            extraHTTPHeaders:{
                accept: 'application/json',
            },
        });
        const response = await loginContext.post('users/login',{
            form:{
                email: userEmail,
                password: userPassword
            }
        });
        return response;
    }
}