import { createContext, useState, useEffect } from 'react';

/*
product
{
  id,
  name,
  price
  imageUrl
}
*/
export const addCartItem = (cartItems, productToAdd) => {
  //find if items is already in the cart
  const existingCartItem = cartItems.find( //if the callback returns true, find returns the cartItem that returned the true
    (cartItem) => cartItem.id === productToAdd.id
  );

  //if a cartItem was returned above (found to already exist), return a new array with that item's quantity updated
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id // when we get to the cartItem that once again matches update the quantity
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  // simply add the item to the cart
  // return a new array by spreding out the existing ones already in the cart
  // add the new item
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartItemCount: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const count = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartItemCount(count);
  }, [cartItems]);

  const addItemToCart = (product) =>
    setCartItems(addCartItem(cartItems, product));

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    cartItemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};