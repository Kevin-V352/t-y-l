import { ReactNode } from 'react';

import { ICartProduct } from '@/interfaces';

export interface CartState {
  cart: ICartProduct[];
  isLoaded: boolean;
};

export interface CartContextProps extends CartState {
  addToCart: (id: string, quantity: number) => void;
  getCurrentQuantity: (id: string) => number | null;
  deleteToCart: (id: string) => void;
};

export interface CartProviderProps {
  children: ReactNode;
};
