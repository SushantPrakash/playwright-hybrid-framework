import { request } from '@playwright/test';

export class AddressAPIClient{
    async getCompleteAddress(country: string, postalCode: number, house: number){
        const apiPostalCodeLookupContext = await request.newContext({
            baseURL: "https://api.practicesoftwaretesting.com/",
            extraHTTPHeaders:{
                accept: "application/json"
            }
        })
        const apiResponse = await apiPostalCodeLookupContext.get("/postcode-lookup",{
            params: `country=${country}&postcode=${postalCode}&house_number=${house}`
        })
        const data = await apiResponse.json();
        return {
            country: data.country,
            pincode: data.postcode,
            house: data.house_number,
            street: data.street,
            city: data.city,
            state: data.state,
        };
    }
}

