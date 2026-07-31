import {cart, addToCart} from '../data/cart.js';
import {products, loadProducts} from '../data/products.js';
import {formatCurrency} from './utils/money.js';

const search = new URLSearchParams(window.location.search).get('search');
const searchBar = document.querySelector('.search-bar');

if (search) {
  searchBar.value = search;
}

document.querySelector('.search-button').addEventListener('click', () => {
  goToSearch();
});

searchBar.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    goToSearch();
  }
});

function goToSearch() {
  window.location.href = `amazon.html?search=${encodeURIComponent(searchBar.value)}`;
}

function getMatchingProducts() {
  if (!search) {
    return products;
  }

  const searchTerm = search.toLowerCase();

  return products.filter((product) => {
    const nameMatches = product.name.toLowerCase().includes(searchTerm);

    const keywordMatches = product.keywords.some((keyword) => {
      return keyword.toLowerCase().includes(searchTerm);
    });

    return nameMatches || keywordMatches;
  });
}

loadProducts(renderProductsGrid);

function renderProductsGrid() {
  let productsHTML = '';

  getMatchingProducts().forEach((product) => {
    productsHTML += `
      <div class="product-container">
        <div class="product-image-container">
          <img class="product-image" src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars" src="${product.getStarsUrl()}">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          ${product.getPrice()}
        </div>

        <div class="product-quantity-container">
          <select class="js-quantity-selector-${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        <div class="product-spacer"></div>

        <div class="product-extra-info">
          ${product.extraInfoHTML()}
        </div>

        <div class="added-to-cart">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart"
        data-product-id="${product.id}">
          Add to Cart
        </button>
      </div>
    `;
  });

  document.querySelector('.js-products-grid').innerHTML = productsHTML;

  function updateCartQuantity() {
    let cartQuantity = 0;

    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });

    document.querySelector('.js-cart-quantity')
      .innerHTML = cartQuantity;
  }

  updateCartQuantity();

  document.querySelectorAll('.js-add-to-cart')
    .forEach((button) => {
      button.addEventListener('click', () => {
        const productId = button.dataset.productId;
        
        const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
        const quantity = Number(quantitySelector.value);

        addToCart(productId, quantity);
        updateCartQuantity();

        const addedMessage = button.parentElement.querySelector('.added-to-cart');
        addedMessage.style.opacity = '1';

        if (button.timeoutId) {
          clearTimeout(button.timeoutId);
        }

        button.timeoutId = setTimeout(() => {
          addedMessage.style.opacity = '0';
        }, 2000);
      });
    });
}
