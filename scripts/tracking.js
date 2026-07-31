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

  const orderTime = dayjs(order.orderTime);
  const time = dayjs(orderItemDetails.estimatedDeliveryTime);

  const denominator = time.diff(orderTime);
  const numerator = dayjs().diff(orderTime);
  const progress = denominator > 0 ? (numerator / denominator) * 100 : 100;
  const barWidth = Math.min(Math.max(progress, 0), 100);

  let currentStatus = 'Preparing';

  if (progress >= 100) {
    currentStatus = 'Delivered';
  } else if (progress >= 50) {
    currentStatus = 'Shipped';
  }

  let trackingHTML = "";

    trackingHTML += `
        <a class="back-to-orders-link link-primary" href="orders.html">
            View all orders
        </a>

        <div class="delivery-date">
            ${currentStatus === 'Delivered' ? 'Delivered on' : 'Arriving on'} ${time.format('dddd, MMMM D')}
        </div>

        <div class="product-info">
            ${matchingProduct.name}
        </div>

        <div class="product-info">
            Quantity: ${orderItemDetails.quantity}
        </div>

        <img class="product-image" src="${matchingProduct.image}">

        <div class="progress-labels-container">
            <div class="progress-label ${currentStatus === 'Preparing' ? 'current-status' : ''}">
            Preparing
            </div>
            <div class="progress-label ${currentStatus === 'Shipped' ? 'current-status' : ''}">
            Shipped
            </div>
            <div class="progress-label ${currentStatus === 'Delivered' ? 'current-status' : ''}">
            Delivered
            </div>
        </div>

        <div class="progress-bar-container">
            <div class="progress-bar" style="width: ${barWidth}%;"></div>
        </div>
    `;

    document.querySelector('.order-tracking').innerHTML = trackingHTML;
});
