import { expect, request, test} from '@playwright/test';
import { AddressAPIClient } from '@api/addressLookupApi.js'
import { AddressBuilder } from '../../src/test_data/addressBuilder.js'

test('Postal Code Lookup test', async({request})=>{
    const response = await request.get(
        "https://api.practicesoftwaretesting.com/postcode-lookup",{
            headers: {accept: "application/json"},
            params: "country=India&postcode=222112&house_number=47"
        })
    
    const respAsString = await response.json();
    console.log(respAsString);
    
})
test('test API from method', async()=>{

    const postalResponse = await new AddressBuilder().getAddressFromAPIFor("India",222112,54);

    console.log(postalResponse.country);
    console.log(postalResponse.pincode);
    console.log(postalResponse.house);
    console.log(postalResponse.street);
    console.log(postalResponse.city);
    console.log(postalResponse.state);
    
})