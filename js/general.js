import {getCartQuantity} from "../data/cart.js";

// Navbar Scroll Display
const navbarElement = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 1) {
    navbarElement.classList.add('navbar-scroll-effect');
  } else {
    navbarElement.classList.remove('navbar-scroll-effect');
  };
});

export function renderNavbarCartQuantity () {
  document.querySelector('.navbar-cart-quantity').innerHTML = `(${getCartQuantity()})`;
};

renderNavbarCartQuantity();