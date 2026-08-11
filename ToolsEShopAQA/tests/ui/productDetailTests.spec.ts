import {test, expect} from "@playwright/test";

test.describe("Product Detail Test Scenarios",()=>{
    test.beforeEach(async ({page})=>{
        await page.goto("https://practicesoftwaretesting.com/");
        await expect(page.getByTitle("Practice Software Testing - Toolshop")).toBeVisible();
    })

    test("Validate product detail is displayed", async ({page})=>{

    })
    test("Add product to cart from product detail page", async ({page})=>{

    })
    test("Validate product detail page when product is out of stock", async ({page})=>{

    })
    test("Validate add to favourite functionality", async ({page})=>{    

    })
})