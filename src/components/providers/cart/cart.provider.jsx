import React, { createContext, useState, useEffect } from 'react'
import {
  addItemToCart,
  removeItemFromCart,
  filterItemFromCart,
  getCartItemsCount,
  getCartTotal,
} from "../../../redux/cart/cart.utils";

export const CartContext = createContext({
  hidden: true,
  toggleHidden: () => { },
  cartItems: [],
  addItem: () => { },
  removeItem: () => { },
  cleatItemFromCart: () => { },
  cartItemsCount: 0,
  getTotal: () => { },
});

const CartProvider = ({ children }) => {
  const [hidden, setHidden] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [total, setTotal] = useState(0);

  const addItem = item => setCartItems(addItemToCart(cartItems, item));
  const removeItem = item => setCartItems(removeItemFromCart(cartItems, item));
  const cleatItemFromCart = (item) =>
    setCartItems(filterItemFromCart(cartItems, item));
  const toggleHidden = () => setHidden(!hidden);

  useEffect(() => {
    setCartItemsCount(getCartItemsCount(cartItems));
    setTotal(getCartTotal(cartItems));
  }, [cartItems])

  return (
    <CartContext.Provider
      value={{
        hidden,
        toggleHidden,
        cartItems,
        addItem,
        removeItem,
        cleatItemFromCart,
        cartItemsCount,
        total
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;