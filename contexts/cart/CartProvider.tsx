import { FC, useEffect, useReducer } from 'react';

import Cookies from 'js-cookie';

import { CartContext, CartProviderProps, CartReducer, CartState } from './';

const CART_INITIAL_STATE: CartState = {
  cart:     [],
  isLoaded: false
};

export const CartProvider: FC<CartProviderProps> = ({ children }): JSX.Element => {

  const [state, dispatch] = useReducer(CartReducer, CART_INITIAL_STATE);

  useEffect(() => {

    loadCartWithCookies();

  }, []);

  useEffect(() => {

    saveCartInCookies();

  }, [state.cart]);

  const loadCartWithCookies = (): void => {

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const prevCart = Cookies.get('cart') ? JSON.parse(Cookies.get('cart')!) : [];
    dispatch({ type: 'LOAD_CART_BY_COOKIES', payload: prevCart });

  };

  const saveCartInCookies = (): void => {

    Cookies.set('cart', JSON.stringify(state.cart));

  };

  const addToCart = (id: string, quantity: number): void => {

    let newCart = [...state.cart];
    const itemIndex = newCart.findIndex(({ id: productId }) => (productId === id));

    if (itemIndex !== -1) newCart[itemIndex] = { id, quantity };
    else newCart = [...newCart, { id, quantity }];

    dispatch({ type: 'ADD_PRODUCT', payload: newCart });

  };

  const deleteToCart = (id: string): void => {

    const newCart = state.cart.filter(({ id: cartItemId }) => (cartItemId !== id));
    dispatch({ type: 'DELETE_PRODUCT', payload: newCart });

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
      deleteToCart,
      getCurrentQuantity
    }}>
      {children}
    </CartContext.Provider>
  );

};