import { FC, useEffect, useReducer } from 'react';

import Cookies from 'js-cookie';

import { tylAPI } from '@/api';
import { ICartProduct } from '@/interfaces';

import { CartContext, CartProviderProps, CartReducer, CartState } from './';

const CART_INITIAL_STATE: CartState = {
  cart:            [],
  totalPrice:      0,
  cookiesLoaded:   false,
  updatedProducts: false
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

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const prevCart = Cookies.get('cart') ? JSON.parse(Cookies.get('cart')!) : [];
    dispatch({ type: 'LOAD_CART_BY_COOKIES', payload: prevCart });

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

  return (
    <CartContext.Provider value={{
      ...state,
      addProduct,
      deleteToCart,
      getCurrentQuantity,
      updateCart,
      unsubscribeCart
    }}>
      {children}
    </CartContext.Provider>
  );

};
