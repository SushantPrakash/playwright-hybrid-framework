import { expect, type Locator, type Page} from '@playwright/test';

export class HeaderSection{
    readonly page: Page;
    readonly title: Locator;
    readonly home: Locator;
    readonly signIn: Locator;
    readonly categories: Locator;
    readonly contact: Locator;
    readonly cartIcon: Locator;
    readonly cartQuantity: Locator;

    constructor(page: Page){
        this.page = page;
        this.title = page.getByTitle('Practice Software Testing - Toolshop');
        this.home = page.getByTestId('nav-home');
        this.signIn = page.getByTestId('nav-sign-in');
        this.categories = page.getByRole('button',{name:'Categories'});
        this.contact = page.getByTestId('nav-contact');
        this.cartIcon = page.getByTestId('nav-cart')
        this.cartQuantity = page.getByTestId('cart-quantity');
    }

    async goToSignInPage(): Promise<void>{
        await this.signIn.click();
    }
    async goToHomePage(): Promise<void>{
        await this.home.click();
    }
    async cartIconDisplaysProductAdded(){
        await expect(this.cartIcon).toBeVisible();
        await expect(this.cartQuantity).toHaveText('1');
    }

    async gotToCart(){
        await this.cartIcon.click();
    }
}