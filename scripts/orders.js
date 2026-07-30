import { orders } from '../data/orders.js';
import { formatCurrency } from './utils/money.js';
import { productData } from '../data/products.js';
import {cart, addToCart} from '../data/cart.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryOptions, calculateDeliveryDate} from '../data/deliveryOptions.js';

let ordersHTML = '';
console.log(orders);

export class Order {
  id;
  placingTime;
  total;

  constructor(orderDetails) {
    this.id = orderDetails.id;
    this.placingTime = orderDetails.orderTime;
    this.total = formatCurrency(orderDetails.totalCostCents);
  }
}

orders.forEach((orderData) => {
  const orderInstance = new Order(orderData);
  const time = dayjs(orderInstance.placingTime);
  const productLoop = orderData.products;

  ordersHTML += `
    <div class="order-container">
      <div class="order-header">
        <div class="order-header-left-section">
          <div class="order-date">
            <div class="order-header-label">Order Placed:</div>
            <div>${time.format('dddd, MMMM D')}</div>
          </div>
          <div class="order-total">
            <div class="order-header-label">Total:</div>
            <div>$${orderInstance.total}</div>
          </div>
        </div>
        <div class="order-header-right-section">  
          <div class="order-header-label">Order ID:</div>
          <div>${orderInstance.id}</div>
        </div>
      </div>
  `;

  if (!productLoop) {
    return;
  }

  productLoop.forEach((product) => {
    const matchingProduct = productData.find((pro) => pro.id === product.productId);
    const estimatedDeliveryTime = dayjs(product.estimatedDeliveryTime);

    ordersHTML += `
      <div class="order-details-grid">
        <div class="product-image-container">
          <img src="${matchingProduct.image}">
        </div>
        <div class="product-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-delivery-date js-delivery-date">
            Arriving on: ${estimatedDeliveryTime.format('dddd, MMMM D')}
          </div>
          <div class="product-quantity">
            Quantity: ${product.quantity}
          </div>
          <button class="buy-again-button button-primary" data-product-id="${product.productId}">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>
        <div class="product-actions">
          <a href="tracking.html">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>
      </div>
    `;
  });

  ordersHTML += `</div>`;
});

document.querySelector('.orders-grid').innerHTML = ordersHTML;

function getCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
  });

  document.querySelector('.cart-quantity').innerHTML = cartQuantity;
}

getCartQuantity();

document.querySelectorAll('.buy-again-button').forEach((button) => {
  button.addEventListener('click', () => {
    addToCart(button.dataset.productId);
    getCartQuantity();
  });
});

