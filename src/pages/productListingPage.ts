import { expect, type Locator, type Page } from '@playwright/test';

export class ProductListingPage {
    readonly page: Page;
    readonly productName: Locator;
    readonly productPrice: Locator;
    readonly productSearch: Locator;
    readonly productSearchBtn: Locator;
    readonly filterByBrand: Locator;
    readonly paginationBtn: Locator;
    readonly sliderMax: Locator;
    readonly sliderMin: Locator;
    readonly sortingDropdown: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productName = page.getByTestId('product-name');
        this.productPrice = page.getByTestId('product-price');
        this.productSearch = page.getByTestId('search-query');
        this.productSearchBtn = page.getByTestId('search-submit');
        this.filterByBrand = page.getByRole('checkbox', { name: 'ForgeFlex Tools' });
        this.paginationBtn = page.getByLabel('Page-2');
        this.sliderMax = page.getByRole('slider', { name: 'ngx-slider-max' });
        this.sliderMin = page.getByRole('slider', { name: 'ngx-slider-min' });
        this.sortingDropdown = page.locator('.sorting-dropdown');
    }

    async searchForToolUsingSearchBox(toolName: string): Promise<string[]>{
        await this.productSearch.fill(toolName);
        await this.productSearchBtn.click();
        await this.page.getByTestId('search_completed').waitFor({state:'attached'});
        return await this.productName.allTextContents();
    }

    async getProductsNames(): Promise<string[]>{
        await this.productName.first().waitFor({state:'visible'});
        return await this.productName.allTextContents();
    }
    async applyFilter(filterName: string): Promise<string[]>{
        switch(filterName.toLowerCase()){
            case "brand":
                await this.filterByBrand.check();
                await this.page.getByTestId('filter_completed').waitFor({state:'attached'});
                return await this.productName.allTextContents();
            default:
                return [];
        }
        
    }
    
    async goToDifferentPage(pageNo: number): Promise<string[]>{
        await this.productName.first().waitFor({state:'visible'});
        let currentPage = parseFloat(await this.page.locator('.page-item.active').locator('.page-link').innerText());
        if(currentPage !== pageNo){
            const firstProduct = await this.productName.first().innerText();
            await this.page.getByLabel(`Page-${pageNo}`).click();
            await expect(this.productName.first()).not.toHaveText(firstProduct);

        }else{
            const firstProduct = await this.page.getByTestId('product-name').first().innerText();
            await this.page.getByLabel(`Page-${pageNo+1}`).click();
            await expect(this.productName.first()).not.toHaveText(firstProduct);
        }
        return await this.productName.allTextContents();
    }

    async moveSliderToXOffset(point:number): Promise<string[]>{
        let currentValue = await this.sliderMax.getAttribute('aria-valuetext');
        let preSliderproduct = await this.productName.count();
        await this.sliderMax.click();
        for(let i=0; i<point;i++){
            await this.sliderMax.press('ArrowLeft');
        }
        let newValue:string = (await this.sliderMax.getAttribute('aria-valuetext'))!;
        expect(currentValue).not.toEqual(newValue);
        await expect(this.productName).not.toHaveCount(preSliderproduct);
        return await this.productName.allTextContents();
    }

    async getProductPrice(productName:string): Promise<string>{
        return await this.page.locator('a[data-test^="product-"]').filter({hasText:productName})
                            .getByTestId('product-price').innerText();
    }

    async clickOnProduct(productName: string){
        await this.productName.filter({hasText: productName}).click();
    }

}

