import { type Locator, type Page, expect} from '@playwright/test';

export class Cart{
    readonly page: Page;
    readonly productName: Locator;
    readonly productPrice: Locator;
    readonly proceedToCheckOut: Locator;
    readonly productQuantity: Locator;
    readonly removeProduct: Locator;
    readonly cartPageStep: Locator;

    constructor(page: Page){
        this.page = page;
        this.productName = page.getByTestId('product-title');
        this.productPrice = page.getByTestId('product-price');
        this.proceedToCheckOut = page.getByRole('button',{name:'Proceed to checkout'});
        this.productQuantity = page.getByTestId('product-quantity');
        this.removeProduct = page.locator('.btn-danger');
        this.cartPageStep = page.locator('.label');
    }

    async validateCorrectProductIsAdded(product: string, price:string){
        await expect(this.proceedToCheckOut).toBeEnabled({timeout: 10000});
        const itemName = await this.productName.innerText();
        const itemPrice = await this.productPrice.innerText();
        expect(itemName.trim()).toEqual(product);
        expect(itemPrice.trim()).toEqual(price);
    }

    // async proceedToSignIn(){
    //     await this.proceedToCheckOut.click();
    // }

    async updateQuantity(newQty:number){
        await this.productQuantity.fill(`${newQty}`);
    }

    async deleteProductFromCart(){
        await this.removeProduct.click();
    }
}