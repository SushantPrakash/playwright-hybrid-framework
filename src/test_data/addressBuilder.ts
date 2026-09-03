import { AddressAPIClient } from '@api/addressLookupApi.js'


export class AddressBuilder{
    async getAddressFromAPIFor(country: string, postalCode: number, house: number){
        const addressFromAPI = new AddressAPIClient();
        const addressInResponse = await addressFromAPI.getCompleteAddress(country, postalCode, house)
        return {
            country: country,
            pincode: addressInResponse.pincode,
            house: addressInResponse.house,
            street: addressInResponse.street,
            city: addressInResponse.city,
            state: addressInResponse.state
        }

    }
}