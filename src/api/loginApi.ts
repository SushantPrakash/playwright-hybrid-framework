import { request, type APIResponse } from '@playwright/test';
import path from 'path';



export class LoginAPIClient{
    
    async loginAs(userEmail: string, userPassword: string){
        const loginContext = await request.newContext({
            baseURL: 'https://api.practicesoftwaretesting.com/',
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