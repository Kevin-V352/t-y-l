import { ReactNode } from 'react';

import { AxiosError } from 'axios';

import { ClientFormData, ICartProduct } from '@/interfaces';

export interface CartState {
  cart:             ICartProduct[];
  userData:         ClientFormData | null;
  totalPrice:       number;
  cookiesLoaded:    boolean;
  updatedProducts:  boolean;
  hideMessage1:     boolean;
  error:            AxiosError | any | null;
};

export interface CartContextProps extends CartState {
  addProduct: (product: ICartProduct) => void;
  getCurrentQuantity: (id: string) => number | null;
  deleteToCart: (id: string) => void;
  updateCart: () => Promise<void>;
  unsubscribeCart: () => void;
  setClientData: (data: ClientFormData, saveData: boolean) => void;
  clearCart: () => void;
  hideMessageInProducts: () => void;
};

export interface CartProviderProps {
  children: ReactNode;
};
