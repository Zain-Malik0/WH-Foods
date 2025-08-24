import {getMatchingProduct} from "./products.js";

export let cart = JSON.parse(localStorage.getItem('cart')) || [{
  id: '4',
  quantity: 1,
  giftWrap: false,
  Bag: false,
  Sample: false
},{
  id: '5',
  quantity: 2,
  giftWrap: false,
  Bag: false,
  Sample: false
}];

// Function to add Items to cart
export function addToCart(productId) {
  let matchingItem = '';

  cart.forEach((cartItem) => {
    if (cartItem.id === productId) {
      matchingItem = cartItem;
    };
  });

  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      id: productId,
      quantity: 1,
      giftWrap: false,
      Bag: false,
      Sample: false
    });
  };
};

// Function to remove items from cart
export function removeFromCart (productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.id != productId) {
      newCart.push(cartItem);
    };
  });

  cart = newCart;
  saveToStorage();
};

// Function to save cart to storage 
export function saveToStorage () {
  localStorage.setItem('cart', JSON.stringify(cart));
};

// Function to calculate total cart quantity 
export function getCartQuantity () {
  let quantity = 0;
  cart.forEach((cartItem) => {
    quantity+=cartItem.quantity;
  });

  return quantity;
};

// Function to update product qunatity in cart using product id
export function updateProductQuantity (productId, quan) {
  cart.forEach((cartItem) => {
    if (cartItem.id === productId) {
      cartItem.quantity+= Number(quan);
    };
  });
};

// Function to get cart Item by id
export function getCartItem(productId) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (cartItem.id === productId) {
      matchingItem = cartItem;
    };
  });

  return matchingItem;
};

// Function to get products total price 
export function getTotalPrice (productId) {
  let totalPrice = 0;
  let matchingProduct = getMatchingProduct(productId);

  cart.forEach((cartItem) => {
    if (cartItem.id === productId) {
      totalPrice = (matchingProduct.price * cartItem.quantity) + (cartItem.giftWrap ? 80 : 0) + (cartItem.Bag ? 70 : 0);
    }
  });

  return totalPrice;
};

// Function to get cart total price
export function getCartTotal() {
  let totalPrice = 0;

  cart.forEach((cartItem) => {
    let matchingProduct = getMatchingProduct(cartItem.id)
      totalPrice += (matchingProduct.price * cartItem.quantity) + (cartItem.giftWrap ? 80 : 0) + (cartItem.Bag ? 70 : 0);
  });

  return totalPrice;  
};

// function to get cart length
export function getCartLength() {
  return cart.length;
};

// function to reset cart
export function resetCart() {
  cart = [];
  saveToStorage();
}