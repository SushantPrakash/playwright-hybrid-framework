import { test as base} from '@playwright/test';
import  { LoginPage } from '../pages/loginPage.js';
import  { ProductDetailPage } from '../pages/productDetailPage.js';
import  { ProductListingPage } from '../pages/productListingPage.js';
import  { HeaderSection } from '../pages/headerSection.js';
import  { CheckoutPage } from '../pages/checkoutSystem/checkoutPage.js';

type PageFixtures={
    loginPage: LoginPage;
    pdp: ProductDetailPage;
    plp: ProductListingPage;
    header: HeaderSection;
    checkout: CheckoutPage;
}

export const test = base.extend<PageFixtures>({
    loginPage: async({page}, use) =>{
        await use(new LoginPage(page));
    },
    pdp: async({page}, use) =>{
        await use(new ProductDetailPage(page));
    },
    plp: async({page}, use)=>{
        await use(new ProductListingPage(page));
    },
    header: async({page}, use) =>{
        await use(new HeaderSection(page));
    },
    checkout: async({page}, use)=>{
        await use(new CheckoutPage(page));
    }
});

export {expect} from '@playwright/test';