import { hygraphAPI } from '@/api';
import { ICardProduct } from '@/interfaces';
import { GET_FILTERED_PRODUCTS } from 'graphql/queries/products';

interface IQueries {
  query: string;
  category?: string;
  sort?: string;
  page: number;
};

type SearchProductsResponse =
  | [ICardProduct[], null]
  | [null, any]

export const searchProducts = async (queries: IQueries): Promise<SearchProductsResponse> => {

  const {
    query = '',
    category = 'product',
    sort = 'publishedAt_DESC'
    /* page = '' */
  } = queries;

  const searchTerm = (query === '0') ? '' : query;

  try {

    const { products }: { products: ICardProduct[] } = await hygraphAPI.request({
      document:  GET_FILTERED_PRODUCTS,
      variables: { category: [category], sort, searchTerm }
    });

    return [products, null];

  } catch (error: any) {

    console.log(error);
    return [null, error];

  };

};
