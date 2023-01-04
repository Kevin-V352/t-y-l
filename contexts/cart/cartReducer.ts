import { ClientFormData, ICartProduct } from '@/interfaces';

import { CartState } from './';

type CartActionType =
  | { type: 'ADD_PRODUCT'; payload: ICartProduct[] }
  | { type: 'DELETE_PRODUCT'; payload: ICartProduct[] }
  | { type: 'LOAD_CART_BY_COOKIES'; payload: ICartProduct[] }
  | { type: 'LOAD_TOTAL_PRICE'; payload: number }
  | { type: 'UPDATE_CART'; payload: ICartProduct[] }
  | { type: 'UNSUBSCRIBE_CART' }
  | { type: 'LOAD_USER_DATA'; payload: ClientFormData }
  | { type: 'CLEAR_CART' }

export const CartReducer = (state: CartState, action: CartActionType): CartState => {

  switch (action.type) {

    case 'LOAD_CART_BY_COOKIES':
      return {
        ...state,
        cookiesLoaded: true,
        cart:          action.payload
      };

    case 'ADD_PRODUCT':
      return {
        ...state,
        cart: action.payload
      };

    case 'DELETE_PRODUCT':
      return {
        ...state,
        cart: action.payload
      };

    case 'LOAD_TOTAL_PRICE':
      return {
        ...state,
        totalPrice: action.payload
      };

    case 'UPDATE_CART':
      return {
        ...state,
        updatedProducts: true,
        cart:            action.payload
      };

    case 'UNSUBSCRIBE_CART':
      return {
        ...state,
        updatedProducts: false
      };

    case 'LOAD_USER_DATA':
      return {
        ...state,
        userData: action.payload
      };

    case 'CLEAR_CART':
      return {
        ...state,
        cart:     [],
        userData: null
      };

    default:
      return state;

  };

};
