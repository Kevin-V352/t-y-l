import { CartState, ICartProduct } from './';

type CartActionType =
  | { type: 'ADD_PRODUCT'; payload: ICartProduct[] }

export const CartReducer = (state: CartState, action: CartActionType): CartState => {

  switch (action.type) {

    case 'ADD_PRODUCT':
      return {
        ...state,
        cart: action.payload
      };

    default:
      return state;

  };

};
