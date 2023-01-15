import axios from 'axios';
import useSWR from 'swr';

import { IProductPriceAndStockResponse } from '@/interfaces';

interface IHookResponse {
  currentPrice: number | null;
  currentStock: number | null;
  isLoading:    boolean;
  isError:      any;
};

const fetcher = async (url: string): Promise<any> => await axios.get(url).then(res => res.data);

const useCurrentPrice = (id: string): IHookResponse => {

  const { data, error } = useSWR<IProductPriceAndStockResponse>(`/api/products/${id}`, fetcher);

  return {
    currentPrice: data?.price ?? null,
    currentStock: data?.stock ?? null,
    isLoading:    (!error && !data),
    isError:      error
  };

};

export default useCurrentPrice;
