import { expect, request, test} from '@playwright/test';
import { AddressBuilder } from '../../src/test_data/addressBuilder.js'
import { Setup } from '../../src/utils/constant.js';
import test_data from '@test_data/test_data.json' with {type: 'json'};


test('Postal Code Lookup test', async({request})=>{
    const response = await request.get(
        Setup.API_BASE_URL,{
            headers: {accept: "application/json"},
            params: `country=${test_data.address_data.country}&postcode=${test_data.address_data.postcode}&house_number=${test_data.address_data.postcode}`
        })
    
    const postalResponse = await response.json();
        
    expect(postalResponse.country).not.toBe('');
    expect(postalResponse.pincode).not.toBe('');
    expect(postalResponse.house).not.toBe('');
    expect(postalResponse.street).not.toBe('');
    expect(postalResponse.city).not.toBe('');
    expect(postalResponse.state).not.toBe('');
})