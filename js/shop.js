import {products} from "../data/products.js";
import {addToCart, cart, saveToStorage, getCartQuantity} from "../data/cart.js";
import { renderNavbarCartQuantity } from "./general.js"; 
import {displayProductId} from "./product-page.js";

let html = '';
products.forEach((product) => {
  html+=`
  <div class="col col-12 col-xxl-2 col-xl-3 col-lg-3 col-md-4 col-sm-6 product-container" data-product-id="${product.id}">

    <div class="product card">
      <div class="product-image-container">
        <img src="${product.image}" class="card-img-top product-image">
      </div>
      <div class="card-body product-name-container">
        <h5 class="card-title product-name">${product.name}</h5>
      </div>
      <ul class="list-group list-group-flush product-details">
        <li class="list-group-item product-rating">
          <div class="count">Count: ${product.rating.count}</div>
          <div class="stars"><img src="images/ratings/rating-${product.rating.stars}.png"></div></li>
        <li class="list-group-item product-price">Rs ${product.price}/-</li>
        <li class="list-group-item add-to-carts">
          <div class="add-to-cart-btn btn" data-product-id="${product.id}">Add to Cart</div>
        </li>
      </ul>
    </div>

  </div>
  `
});

document.querySelector('.js-row').innerHTML = html;

// Add to Cart Button 
document.querySelectorAll('.add-to-cart-btn').forEach((Button) => {
  Button.addEventListener('click', (event) => {
    event.stopPropagation(); 
    addToCart(Button.dataset.productId);
    saveToStorage();
    renderNavbarCartQuantity();
  });
});

console.log(cart);

document.querySelectorAll('.product-container').forEach((productContainer) => {
  let displayId = productContainer.dataset.productId;
  productContainer.addEventListener('click', () => {
    localStorage.setItem('displayProductId', displayId);
    window.location.href = "product.html";
  });
});