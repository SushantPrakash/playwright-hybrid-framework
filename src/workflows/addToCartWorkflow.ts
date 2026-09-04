import { type Page } from '@playwright/test';

import { ProductDetailPage } from "@pages/productDetailPage.js";
import { HeaderSection } from "@pages/headerSection.js";
import { CheckoutPage } from '@checkout/checkoutPage.js';


export class AddToCartFlow{
    readonly pdp: ProductDetailPage;
    readonly header: HeaderSection;
    readonly checkout: CheckoutPage;

    constructor(page: Page){
        this.pdp = new ProductDetailPage(page);
        this.header = new HeaderSection(page);
        this.checkout = new CheckoutPage(page);

    }

    async addProductTocart(productName: string, itemPrice: string){
        await this.pdp.addToCart();
        await this.pdp.addToCartAlertIsVisible();
        await this.header.cartIconDisplaysProductAdded();
        await this.header.gotToCart();
        await this.checkout.cart.validateCorrectProductIsAdded(productName,itemPrice);
        await this.checkout.clickProceedToCheckoutBtn();

    }
}