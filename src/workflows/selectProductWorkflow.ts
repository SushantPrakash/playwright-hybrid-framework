import {type Page} from '@playwright/test';

import { ProductDetailPage } from "@pages/productDetailPage.js";
import { ProductListingPage } from "@pages/productListingPage.js";

export class SelectProductFlow{
    readonly pdp: ProductDetailPage;
    readonly plp: ProductListingPage;

    constructor(page: Page){
        this.pdp = new ProductDetailPage(page);
        this.plp = new ProductListingPage(page);
    }

    async selectProduct(productName: string, itemPrice: string){
        await this.plp.clickOnProduct(productName);
        await this.pdp.validateProductDetail(productName,itemPrice);
    }
}