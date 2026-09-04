import { test as base} from '@playwright/test';
import { AddToCartFlow } from '../workflows/addToCartWorkflow.js';
import { CheckoutFlow } from '../workflows/checkoutWorkflow.js';
import { SelectProductFlow } from '../workflows/selectProductWorkflow.js'

type E2EFixture = {
    selectProductFlow: SelectProductFlow;
    addToCartFlow: AddToCartFlow;
    checkoutFlow: CheckoutFlow;
}

export const test = base.extend<E2EFixture>({
    selectProductFlow: async({page}, use) =>{
        await use(new SelectProductFlow(page))
    },

    addToCartFlow: async({page}, use) =>{
        await use(new AddToCartFlow(page))
    },

    checkoutFlow: async({page}, use) =>{
        await use(new CheckoutFlow(page))
    },
})

export {expect} from '@playwright/test';