import {test,expect} from '@playwright/test';

test.describe("Product Listing Test Scenarios",()=>{
    test.beforeEach(async ({page})=>{
        await page.goto("https://practicesoftwaretesting.com/");
        await expect(page.getByTitle("Practice Software Testing - Toolshop")).toBeVisible();
    })

    test("Validate Product grid is displayed", async ({page})=>{
        await page.getByTestId('product-name').first().waitFor({state:'visible'});
        let productNames = await page.getByTestId('product-name').allTextContents();
        expect(productNames.length).toBeGreaterThan(0);
        productNames.forEach((prodName)=>{
            expect(prodName.trim()).not.toBe('');
        })
        await expect(page.locator(".grid-title")).toHaveCount(4);
    })

    test("Validate search product functionality", async ({page})=>{
        await page.getByTestId('search-query').fill('Hammer');
        await page.getByTestId('search-submit').click();
        await page.getByTestId('search_completed').waitFor({state:'attached'});
        let returnedProducts = await page.getByTestId('product-name').allTextContents();
        expect(returnedProducts.length).toBeGreaterThan(0);
        returnedProducts.forEach((prod)=>{
            expect(prod.toLowerCase()).toContain('hammer');
        }) 
    })
    test("Validate product filter by brand functionality", async ({page})=>{
        await page.getByTestId('product-name').first().waitFor({state:'visible'});
        let productNamesBeforeBrandFilter = await page.getByTestId('product-name').allTextContents();
        await page.getByRole('checkbox',{name:'ForgeFlex Tools'}).check();
        await page.getByTestId('filter_completed').waitFor({state:'attached'});
        let returnedProducts = await page.getByTestId('product-name').allTextContents();
        expect(returnedProducts.length).toBeGreaterThan(0);
        returnedProducts.forEach((prod)=>{
            expect(prod.toLowerCase()).not.toBe('');
        })
        expect(returnedProducts).not.toEqual(productNamesBeforeBrandFilter);

    })
    test("Validate pagination functionality", async ({page})=>{
        await page.getByTestId('product-name').first().waitFor({state:'visible'});
        const firstProduct = await page.getByTestId('product-name').first().innerText();
        let productNamesOnFirstPage = await page.getByTestId('product-name').allTextContents();
        await page.getByLabel('Page-2').click();
        await expect(page.getByTestId('product-name').first()).not.toHaveText(firstProduct);
        let returnedProducts = await page.getByTestId('product-name').allTextContents();
        expect(returnedProducts.length).toBeGreaterThan(0);
        returnedProducts.forEach((prod)=>{
            expect(prod.toLowerCase()).not.toBe('');
        })
        expect(returnedProducts).not.toEqual(productNamesOnFirstPage);


    })
    test("Validate price range slider and sorting functionality", async ({page})=>{
        const productsBefore = await page.getByTestId('product-name').allTextContents();
        const sliderMax= page.getByRole('slider', { name: 'ngx-slider-max' });
        let currentValue = await sliderMax.getAttribute('aria-valuetext');
        await sliderMax.click();
        for(let i=0; i<96;i++){
            await sliderMax.press('ArrowLeft');
        }
        let newValue:string = (await sliderMax.getAttribute('aria-valuetext'))!;
        expect(currentValue).not.toEqual(newValue);
        await expect(page.getByTestId('product-name')).not.toHaveCount(productsBefore.length);
        let maxValue:number = parseFloat(newValue);
        await page.getByTestId('sort').selectOption('Price (Low - High)');
        await page.getByTestId('sorting_completed').waitFor({state:'attached'});
        const allPrices: number[] = (await page.getByTestId('product-price').allTextContents())
                                    .map(p => parseFloat(p.replace(/[^0-9.]/g, '')));
        for (let i = 1; i < allPrices.length; i++) {
            expect(allPrices[i]).toBeGreaterThanOrEqual(allPrices[i - 1]!);
        }
        allPrices.forEach((price)=>{
            expect(price).toBeLessThanOrEqual(maxValue);
        })      
        
    })
})