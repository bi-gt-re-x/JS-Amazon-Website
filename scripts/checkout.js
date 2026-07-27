import {renderOrderSummary} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import { loadProducts, loadProductsFetch } from '../data/products.js';
import { loadCart } from '../data/cart.js';

async function loadPage() {
    try {
        await loadProductsFetch();

        const value = await new Promise((resolve, reject) => {
            loadCart(() => {
                reject('error3');
                resolve('value3');
            })
        });

    } catch (error) {
        console.log('Unexpected error');
    }

    renderOrderSummary();
    renderPaymentSummary();
}

loadPage();