import { FC, useReducer } from 'react';

import { CartContext, CartProviderProps, CartReducer, CartState } from './';

const CART_INITIAL_STATE: CartState = {
  cart: []
};

export const CartProvider: FC<CartProviderProps> = ({ children }): JSX.Element => {

  const [state, dispatch] = useReducer(CartReducer, CART_INITIAL_STATE);

  const addToCart = (id: string, quantity: number): void => {

    let newCart = [...state.cart];
    const itemIndex = newCart.findIndex(({ id: productId }) => (productId === id));

    if (itemIndex !== -1) newCart[itemIndex] = { id, quantity };
    else newCart = [...newCart, { id, quantity }];

    dispatch({ type: 'ADD_PRODUCT', payload: newCart });

  };

  const getCurrentQuantity = (id: string): number | null => {

    const newCart = [...state.cart];
    const productExist = newCart.find(({ id: productId }) => productId === id);

    if (!productExist) return null;

    return productExist.quantity;

  };

  return (
    <CartContext.Provider value={{
      ...state,
      addToCart,
      getCurrentQuantity
    }}>
      {children}
    </CartContext.Provider>
  );

};
