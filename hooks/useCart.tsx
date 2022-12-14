import axios from 'axios';
import useSWR from 'swr';

import { ICartProductResponse, ICartProduct } from '@/interfaces';
import { calculators } from '@/utils';

interface HookResponse {
  products: ICartProductResponse[];
  isLoading: boolean;
  isError: boolean;
};

const useCart = (cartItems: ICartProduct[], contextLoaded: boolean): HookResponse => {

  const fetcher = async (url: string): Promise<any> => await axios.post(url, { cartItems }).then(res => res.data);

  const ready = contextLoaded ? '/api/cart' : null;

  const { data, error } = useSWR<ICartProductResponse[]>(ready, fetcher);

  return {
    products:  data ? calculators.syncProducts(cartItems, data) : [],
    isLoading: (!error && !data),
    isError:   error
  };

};

export default useCart;
