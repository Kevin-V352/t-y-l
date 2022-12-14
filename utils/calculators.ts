import { ICartProduct, ICartProductResponse } from '@/interfaces';

export const revalidateStock = (currentCart: ICartProduct[], updatedProducts: ICartProductResponse[]): ICartProductResponse[] => {

  const response: ICartProductResponse[] = [];

  currentCart.forEach((cartItem) => {

    const dbProduct = updatedProducts.find((product) => product.id === cartItem.id);

    if (!dbProduct) return;

    if (cartItem.quantity > dbProduct.stock) response.push({ ...dbProduct, quantity: dbProduct.stock });
    else response.push({ ...dbProduct, quantity: cartItem.quantity });

  });

  return response;

};

export const syncProducts = (currentCart: ICartProduct[], updatedProducts: ICartProductResponse[]): ICartProductResponse[] => {

  const response: ICartProductResponse[] = [];

  currentCart.forEach((cartItem) => {

    const dbProduct = updatedProducts.find((product) => product.id === cartItem.id);

    if (!dbProduct) return;

    response.push(dbProduct);

  });

  return response;

};
