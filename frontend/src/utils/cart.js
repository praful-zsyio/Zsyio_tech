const CART_KEY = "estimation_cart";

export const getCart = () => {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
};

export const saveCart = (cart) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const addToCart = (item) => {
  const cart = getCart();
  cart.push(item);
  saveCart(cart);
  return cart;
};

export const removeFromCart = (index) => {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  return cart;
};

export const clearCart = () => {
  localStorage.removeItem(CART_KEY);
};
