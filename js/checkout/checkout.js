// Imports from other files
import {getMatchingProduct} from "../../data/products.js";
import {cart, saveToStorage, updateProductQuantity, removeFromCart, getTotalPrice, getCartItem, getCartQuantity, getCartTotal, resetCart} from "../../data/cart.js";
import {renderNavbarCartQuantity} from "../general.js";

renderNavbarCartQuantity();

function renderOrderSummary () {
  
  let html = '';

  cart.forEach((cartItem) => {

    const matchingProduct = getMatchingProduct(cartItem.id);

    html += `
      <div class="product row">
        <div class="product-container col-12 col-md-8">
          <div class="product-image-container">
            <img src="${matchingProduct.image}">
          </div>
          <div class="product-details">
            <div class="product-name">${matchingProduct.name}</div>
            <div class="product-price">Rs ${getTotalPrice(matchingProduct.id)} /-</div>
            <div class="product-quantity-container js-quantity-container" data-product-id="${matchingProduct.id}">
              Quantity: 
              <i class="fa-solid fa-plus js-plus"></i>
              <div class="product-quantity js-product-quantity">${cartItem.quantity}</div>
              <i class="fa-solid fa-minus js-minus"></i>
            </div>
          </div>
        </div>
        <div class="extra-details col-12 col-md-4" data-product-id="${matchingProduct.id}">
          <div class="heading">Choose Add Ons </div>

          <label class="extra-option">
            <div class="addOn-details">
              <input type="checkbox" data-id="1" ${cartItem.giftWrap ? "checked" : ""}> Add Gift Packing
            </div>
            <div class="addOn-price">Rs 80/-</div>
          </label>

          <label class="extra-option">
            <div class="addOn-details">
              <input type="checkbox" data-id="2" ${cartItem.Bag ? "checked" : ""}> Eco Friendly Bag
            </div>
            <div class="addOn-price">Rs 70/-</div>
          </label>

          <label class="extra-option">
            <div class="addOn-details">
              <input type="checkbox" data-id="3" ${cartItem.Sample ? "checked" : ""}> Free Sample
            </div>
            <div class="addOn-price">Rs 0/-</div>
          </label>

        </div>
      </div>
    `
  });

  document.querySelector('.products-container').innerHTML = html;

  // Quantity Updater Buttons
  document.querySelectorAll('.js-quantity-container').forEach((Container) => {
    Container.querySelector('.js-plus').addEventListener('click', () => {
      updateProductQuantity(Container.dataset.productId,'1');
      saveToStorage();
      renderOrderSummary();
      renderNavbarCartQuantity();
      renderPaymentSummary();
    });

    Container.querySelector('.js-minus').addEventListener('click', () => {
      let productQuantityElement = Container.querySelector('.js-product-quantity')
      if (productQuantityElement.innerHTML>1) {
        updateProductQuantity(Container.dataset.productId,'-1');
      } else {
        removeFromCart(Container.dataset.productId);
      };
      saveToStorage();
      renderOrderSummary();
      renderNavbarCartQuantity();
      renderPaymentSummary();
    });
  });

  document.querySelectorAll('.extra-details').forEach((extraDetailsElement) => {
    const productId = extraDetailsElement.dataset.productId;
    const matching = getCartItem(productId);

    extraDetailsElement.querySelectorAll('.extra-option input').forEach((option) => {
      option.addEventListener('click', () => {
        if (option.dataset.id === '1') {
          matching.giftWrap = option.checked;
        } else if (option.dataset.id === '2') {
          matching.Bag = option.checked;
        } else if (option.dataset.id === '3') {
          matching.Sample = option.checked;
        }
        saveToStorage();
        renderOrderSummary();
        renderPaymentSummary();
      });
    });    
  });
};

function renderPaymentSummary () {
  const itemsTotal = getCartTotal();
  const shippingTotal = cart.length * 100;
  const beforeTaxTotal = itemsTotal + shippingTotal;
  const taxTotal = beforeTaxTotal * 0.075;
  const priceTotal = beforeTaxTotal + taxTotal;

  let html = `
    <div class="payment-summary-container">
      <div class="main-heading">Order Summary</div>
      <div class="order-price-breakdown">
        <div class="item-container">
          <div class="heading">Items (${getCartQuantity()}):</div>
          <div class="price">Rs ${itemsTotal}/-</div>
        </div>
        <div class="shipping-container">
          <div class="heading">Shipping & handling:</div>
          <div class="price">Rs ${shippingTotal}/-</div>
        </div>
        <div class="beforeTax-container">
          <div class="heading">Total before tax:</div>
          <div class="price">Rs ${beforeTaxTotal}/-</div>
        </div>
        <div class="estimatedTax-container">
          <div class="heading">Estimated tax (7.5%):</div>
          <div class="price">Rs ${Math.round(taxTotal)}/-</div>
        </div>
      </div>
      <div class="total-price-container">
        <div class="total-price">
          <div class="heading">Order Total:</div>
          <div class="price">Rs ${Math.round(priceTotal)}/-</div>
        </div>
        <div class="proceed-to-details-btn btn js-proceed-btn">Proceed to details</div>
      </div>
    </div>
  `;

  document.querySelector('.summary-container').innerHTML = html;

  const checkoutForm = document.getElementById('checkout-form');
  checkoutForm.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log("form working")

    resetCart();
    checkoutForm.reset();
    renderOrderSummary();
    renderPaymentSummary();
    renderNavbarCartQuantity();
  });

  let proceed = false;
  document.querySelector('.js-proceed-btn').addEventListener('click', () => {
    if (!proceed) {
      document.querySelector('.payment-summary').classList.add('proceed');
      proceed = true;
    } else {
      document.querySelector('.payment-summary').classList.remove('proceed');
      proceed = false;
    }
  });
};

renderOrderSummary();
renderPaymentSummary();