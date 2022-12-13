import { ReactNode } from 'react';

import { ICartProduct } from '@/interfaces';

export interface CartState {
  cart: ICartProduct[];
};

export interface CartContextProps extends CartState {
  addToCart: (id: string, quantity: number) => void;
  getCurrentQuantity: (id: string) => number | null;
};

export interface CartProviderProps {
  children: ReactNode;
};
