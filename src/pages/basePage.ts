import { expect, type Page} from '@playwright/test';

export class BasePage {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async open(url: string) : Promise<void> {
        await this.page.goto(url);
        await expect(this.page.getByRole('link', { name: 'Practice Software Testing -' })).toBeVisible();
    }
}