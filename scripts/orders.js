import { orders } from "../data/orders.js";
import { formatCurrency } from "./utils/money.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

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

let ordersHTML = "";

orders.forEach((orderData) => {
  const orderInstance = new Order(orderData);
  const time = dayjs(orderInstance.placingTime);

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
      <div class="order-details-grid">
        <div class="product-image-container">
          <img src="$images/products/athletic-cotton-socks-6-pairs.jpg">
        </div>
        <div class="product-details">
          <div class="product-name">
            Black and Gray Athletic Cotton Socks - 6 Pairs
          </div>
          <div class="product-delivery-date">
            Arriving on: August 15
          </div>
          <div class="product-quantity">
            Quantity: 1
          </div>
          <button class="buy-again-button button-primary">
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
    </div>
  `;
});

document.querySelector(".orders-grid").innerHTML = ordersHTML;
