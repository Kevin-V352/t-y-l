import axios from 'axios';
import useSWR from 'swr';

import { ICardProduct } from '../interfaces/product';

interface HookResponse {
  data?: ICardProduct[];
  isLoading: boolean;
  error: any;
};

const fetcher = async (url: string): Promise<any> => await axios.get(url).then((res) => res.data);

const useFilter = (): HookResponse => {

  const { data, error } = useSWR<ICardProduct[]>('/api/products', fetcher);

  return {
    data,
    error,
    isLoading: (!error && !data)
  };

};

export default useFilter;
