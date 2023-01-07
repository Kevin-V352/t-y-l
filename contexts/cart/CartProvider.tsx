/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { FC, useEffect, useReducer } from 'react';

import Cookies from 'js-cookie';

import { tylAPI } from '@/apis';
import { ClientFormData, ICartProduct } from '@/interfaces';

import { CartContext, CartProviderProps, CartReducer, CartState } from './';

const CART_INITIAL_STATE: CartState = {
  cart:            [],
  userData:        null,
  totalPrice:      0,
  cookiesLoaded:   false,
  updatedProducts: false,
  hideMessage1:    false
};

export const CartProvider: FC<CartProviderProps> = ({ children }): JSX.Element => {

  const [state, dispatch] = useReducer(CartReducer, CART_INITIAL_STATE);

  useEffect(() => {

    loadCartWithCookies();

  }, []);

  useEffect(() => {

    saveCartInCookies();
    calcTotalPrice();

  }, [state.cart]);

  const loadCartWithCookies = (): void => {

    const prevCart = Cookies.get('cart') ? JSON.parse(Cookies.get('cart')!) : [];
    const prevMessage1Status = Cookies.get('hide_message_1') ? JSON.parse(Cookies.get('hide_message_1')!) : false;

    dispatch({
      type:    'LOAD_DATA_BY_COOKIES',
      payload: {
        cart:         prevCart,
        hideMessage1: prevMessage1Status
      }
    });

  };

  const saveCartInCookies = (): void => {

    Cookies.set('cart', JSON.stringify(state.cart));

  };

  const addProduct = (product: ICartProduct): void => {

    let newCart = [...state.cart];
    const itemIndex = newCart.findIndex(({ id: productId }) => (productId === product.id));

    if (itemIndex !== -1) newCart[itemIndex] = product;
    else newCart = [...newCart, product];

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

  const calcTotalPrice = (): void => {

    const totalPrice = state.cart.reduce((acc, { price, quantity }) => (acc + (price * quantity)), 0);

    dispatch({ type: 'LOAD_TOTAL_PRICE', payload: totalPrice });

  };

  const updateCart = async (): Promise<void> => {

    try {

      const { data } = await tylAPI.post<ICartProduct[]>('/cart', { cartItems: state.cart });
      dispatch({ type: 'UPDATE_CART', payload: data });

    } catch (error) {

      console.log(error);
      // TODO: Implement error handler

    };

  };

  const unsubscribeCart = (): void => {

    dispatch({ type: 'UNSUBSCRIBE_CART' });

  };

  const setClientData = (data: ClientFormData, saveData: boolean): void => {

    if (saveData) {

      Cookies.set('userData', JSON.stringify(data));

    } else {

      if (Cookies.get('userData')) Cookies.remove('userData');

    };

    dispatch({ type: 'LOAD_USER_DATA', payload: data });

  };

  const clearCart = (): void => {

    dispatch({ type: 'CLEAR_CART' });

  };

  const hideMessageInProducts = (): void => {

    Cookies.set('hide_message_1', JSON.stringify(true));
    dispatch({ type: 'HIDE_MESSAGE_1' });

  };

  return (
    <CartContext.Provider value={{
      ...state,
      addProduct,
      deleteToCart,
      getCurrentQuantity,
      updateCart,
      unsubscribeCart,
      setClientData,
      clearCart,
      hideMessageInProducts
    }}>
      {children}
    </CartContext.Provider>
  );

};
