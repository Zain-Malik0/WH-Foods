import {getMatchingProduct} from "../data/products.js";

export let displayProductId;

function renderProductDetails (productId) {

  let matchingProduct = getMatchingProduct(productId);

  let html = `
    <div class="container">
      <div class="row">
        <div class="main-heading">
          Product Details >
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-sm-4 border product-image-wraper">
          <div class="product-image-container">
            <img class="product-image" src="${matchingProduct.image}">
          </div>
        </div>
        <div class="col-12 col-sm-8 border product-content-wrapper">
          <div class="container-1 con">
            <div class="product-name">${matchingProduct.name}</div>
            <div class="product-rating">
              <div class="product-stars">
                <img src="images/ratings/rating-${matchingProduct.rating.stars}.png">
              </div>
              <div class="product-count">(${matchingProduct.rating.count})</div>
            </div>
          </div>
          <div class="container-2 con">
            <div class="product-quantity"><strong>Quantity:</strong> ${matchingProduct.quantity}</div>
            <div class="product-flavor"><strong>Flavor:</strong> ${matchingProduct.flavor}</div>
          </div>
          <div class="container-3 con">
            <div class="keypoints">
              <ul>
                <li>${matchingProduct.keypoints.one}</li>
                <li>${matchingProduct.keypoints.two}</li>
                <li>${matchingProduct.keypoints.three}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  document.querySelector('.product').innerHTML = html;
};

const productContainer = document.querySelector('.product');
if (productContainer) {
  renderProductDetails(localStorage.getItem('displayProductId'));
}