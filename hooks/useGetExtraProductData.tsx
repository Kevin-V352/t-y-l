import axios from 'axios';
import useSWR from 'swr';

import { ICardProduct, IProductExtraDataResponseForClient } from '@/interfaces';

interface IHookResponse {
  currentPrice:     number | null;
  currentStock:     number | null;
  relatedProducts:  ICardProduct[] | null;
  isLoading:        boolean;
  isError:          any;
};

const fetcher = async (url: string): Promise<any> => await axios.get(url).then(res => res.data);

const useGetExtraProductData = (id: string): IHookResponse => {

  const { data, error } = useSWR<IProductExtraDataResponseForClient>(`/api/products/${id}`, fetcher);

  return {
    currentPrice:    data?.productDetails.price ?? null,
    currentStock:    data?.productDetails.stock ?? null,
    relatedProducts: data?.relatedProducts ?? null,
    isLoading:       (!error && !data),
    isError:         error
  };

};

export default useGetExtraProductData;
