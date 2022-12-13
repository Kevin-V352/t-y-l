import { ICartProduct } from '@/interfaces';

import { CartState } from './';

type CartActionType =
  | { type: 'ADD_PRODUCT'; payload: ICartProduct[] }
  | { type: 'LOAD_CART_BY_COOKIES'; payload: ICartProduct[] }

export const CartReducer = (state: CartState, action: CartActionType): CartState => {

  switch (action.type) {

    case 'LOAD_CART_BY_COOKIES':
    case 'ADD_PRODUCT':
      return {
        ...state,
        cart: action.payload
      };

    default:
      return state;

  };

};
