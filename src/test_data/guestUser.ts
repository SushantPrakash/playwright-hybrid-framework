import { faker } from '@faker-js/faker';

export interface GuestUser{
    firstName: string;
    lastName: string;
    email: string;
}

export class GuestUserDetails{
    
    guestUser(): GuestUser{
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const email = faker.internet.email({ firstName, lastName });
        return {
            firstName: firstName,
            lastName: lastName,
            email: email
        }
    }
}