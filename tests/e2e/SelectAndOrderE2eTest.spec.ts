import {test, expect} from '@fixtures/base.fixture.js';
import test_data from '@test_data/test_data.json' with {type: 'json'};
import { Setup } from '@utils/constant.js';


test("End to End process to buy product from Tools E-Shop", async({
    basePage,plp,selectProductFlow,addToCartFlow,checkoutFlow})=>{
        await basePage.open(Setup.UI_BASE_URL);
        const productName = Setup.PRODUCT_NAME;
        let itemPrice = await plp.getProductPrice(productName);
        await selectProductFlow.selectProduct(productName,itemPrice);
        await addToCartFlow.addProductTocart(productName,itemPrice);
        await checkoutFlow.checkoutProcess();
    }
)

