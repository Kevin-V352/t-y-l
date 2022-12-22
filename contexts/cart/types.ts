import { ReactNode } from 'react';

import { ICartProduct } from '@/interfaces';

export interface CartState {
  cart: ICartProduct[];
  totalPrice: number;
  cookiesLoaded: boolean;
  updatedProducts: boolean;
};

export interface CartContextProps extends CartState {
  addProduct: (product: ICartProduct) => void;
  getCurrentQuantity: (id: string) => number | null;
  deleteToCart: (id: string) => void;
  updateCart: () => Promise<void>;
  unsubscribeCart: () => void;
};

export interface CartProviderProps {
  children: ReactNode;
};
