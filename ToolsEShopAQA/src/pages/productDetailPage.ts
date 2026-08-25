import { expect, type Locator, type Page } from '@playwright/test';

export class ProductDetailPage {
    readonly page: Page;
    readonly productName: Locator;
    readonly productPrice: Locator;
    readonly addToCartBtn: Locator;
    readonly addToFavoritesBtn: Locator;
    readonly addedToCartAlert: Locator;
    readonly addedToFavoritesAlert: Locator;
    readonly productSpecRow: Locator;
    

    constructor(page: Page) {
        this.page = page;
        this.productName = page.getByTestId('product-name');
        this.productPrice = page.getByTestId('unit-price');
        this.addToCartBtn = page.getByRole('button', { name: 'Add to cart' });
        this.addToFavoritesBtn = page.getByTestId('add-to-favorites');
        this.addedToCartAlert = page.getByRole('alert', { name: 'Product added to shopping cart.' });
        this.addedToFavoritesAlert = page.getByRole('alert', { name: 'Product added to your favorite list.' });
        this.productSpecRow = page.getByTestId('product-specs').getByTestId('spec-row');
    }

    async validateProductDetail(productName: string, productPrice: string) {
        await this.page.waitForURL("**/product/**");
        await expect(this.productName).toHaveText(productName);
        await expect(this.productPrice).toHaveText(productPrice.substring(1));
        await expect(this.productSpecRow).toHaveCount(5);

    }
    async addToCart() {
        await this.addToCartBtn.click();
    }

    async addToCartAlertIsVisible(){
        await expect(this.addedToCartAlert).toBeVisible();
        await this.addedToCartAlert.waitFor({ state: 'detached' });
    }

    async addToFavorites() {
        await this.addToFavoritesBtn.click();
    }

    async addToFavoritesAlertIsVisible() {
        await expect(this.addedToFavoritesAlert).toBeVisible();
        await this.addedToFavoritesAlert.waitFor({ state: 'detached' });
    }

    
}