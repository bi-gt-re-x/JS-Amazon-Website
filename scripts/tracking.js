import { productData } from "../data/products.js";
import { orders } from '../data/orders.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('productId');
  const orderId = urlParams.get('orderId');
  const matchingProduct = productData.find((pro) => pro.id === productId);
  const order = orders.find((ord) => ord.id === orderId);
  const orderMiddle = order.products;
  let orderItemDetails = '';
  
  orderMiddle.forEach((product) => {
    if (product.productId === productId) {
        orderItemDetails = product;
    }
  });

  const time = dayjs(orderItemDetails.estimatedDeliveryTime);

  let trackingHTML = "";

    trackingHTML += `
        <a class="back-to-orders-link link-primary" href="orders.html">
            View all orders
        </a>

        <div class="delivery-date">
            Arriving on ${time.format('dddd, MMMM D')}
        </div>

        <div class="product-info">
            ${matchingProduct.name}
        </div>

        <div class="product-info">
            Quantity: ${orderItemDetails.quantity}
        </div>

        <img class="product-image" src="${matchingProduct.image}">

        <div class="progress-labels-container">
            <div class="progress-label">
            Preparing
            </div>
            <div class="progress-label current-status">
            Shipped
            </div>
            <div class="progress-label">
            Delivered
            </div>
        </div>

        <div class="progress-bar-container">
            <div class="progress-bar"></div>
        </div>
    `;

    document.querySelector('.order-tracking').innerHTML = trackingHTML;
});
