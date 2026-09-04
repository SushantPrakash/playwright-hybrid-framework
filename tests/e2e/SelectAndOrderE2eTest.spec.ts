import {test, expect} from '@fixtures/base.fixture.js';
import test_data from '@test_data/test_data.json' with {type: 'json'};


test("End to End process to buy product from Tools E-Shop", async({
    basePage,plp,selectProductFlow,addToCartFlow,checkoutFlow})=>{
        await basePage.open('https://practicesoftwaretesting.com/');
        const productName = "Combination Pliers";
        let itemPrice = await plp.getProductPrice(productName);
        await selectProductFlow.selectProduct(productName,itemPrice);
        await addToCartFlow.addProductTocart(productName,itemPrice);
        await checkoutFlow.checkoutProcess();
    }
)

