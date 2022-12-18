import axios from 'axios';
import useSWR from 'swr';

interface IHookResponse {
  currentPrice: number | null;
  isLoading:    boolean;
  isError:      any;
};

const fetcher = async (url: string): Promise<any> => await axios.get(url).then(res => res.data);

const useCurrentPrice = (id: string): IHookResponse => {

  const { data, error } = useSWR<{ price: number }>(`/api/products/${id}`, fetcher);

  return {
    currentPrice: data?.price ?? null,
    isLoading:    (!error && !data),
    isError:      error
  };

};

export default useCurrentPrice;
