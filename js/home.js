import {renderNavbarCartQuantity} from "./general.js";
renderNavbarCartQuantity();

import {products} from "../data/products.js";
import {addToCart, cart, saveToStorage, getCartQuantity} from "../data/cart.js";  

let html = '';
products.forEach((product) => {
  if (product.featured) {
    html+=`
      <div class="col col-12 col-md-3 col-sm-6">
        <div class="card">
          <div class="product-image-container">
            <img src="${product.image}" class="card-img-top product-image">
          </div>
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item rating">
              <div class="count">Count: ${product.rating.count}</div>
              <div class="stars"><img src="images/ratings/rating-${product.rating.stars}.png"></div></li>
            <li class="list-group-item price">Rs ${product.price}/-</li>
            <li class="list-group-item add-to-cart">
              <div class="add-to-cart-btn btn" data-product-id = "${product.id}">Add to Cart</div>
            </li>
          </ul>
        </div>
      </div>
    `
  }
});

document.querySelector('.js-row').innerHTML = html;

// Add to Cart Button 
document.querySelectorAll('.add-to-cart-btn').forEach((Button) => {
  Button.addEventListener('click', () => {
    addToCart(Button.dataset.productId);
    saveToStorage();
    renderNavbarCartQuantity();
  });
});

console.log(cart);

// Faq Section
// Faq's Section
const faqElement = document.querySelectorAll('.faqs-section .faq');
faqElement.forEach(faq => {
  faq.querySelector('.ques').addEventListener('click', () => {

    faqElement.forEach(otherFaq => {
      if (otherFaq !== faq) {
        otherFaq.querySelector('.ans').classList.remove('ans-display');
      }
    });

    faq.querySelector('.ans').classList.add('ans-display');
  })
});