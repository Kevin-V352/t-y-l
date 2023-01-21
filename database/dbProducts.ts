import { hygraphAPI } from '@/apis';
import { IPaginatedProducts, IPaginatedProductsResponse, IProductDetails } from '@/interfaces';
import {
  GET_FILTERED_PRODUCTS,
  GET_ALL_SLUGS,
  GET_PRODUCT_BY_SLUG
} from 'graphql/queries/product';

interface IQueries {
  query: string;
  category?: string;
  sort?: string;
  page: number;
};

type TSearchProductsResponse =
  | [IPaginatedProducts, null]
  | [null, any]

type TGetAllSlugsResponse =
  | [string[], null]
  | [null, any]

type TGetProductBySlugResponse =
  | [IProductDetails, null]
  | [null, any]

export const searchProducts = async (queries: IQueries): Promise<TSearchProductsResponse> => {

  const {
    query = '',
    category = 'product',
    sort = 'publishedAt_DESC',
    page = 0
  } = queries;

  const searchTerm = (query === '0') ? '' : query;

  try {

    const { productsConnection: { pageInfo, edges } }: { productsConnection: IPaginatedProductsResponse } = await hygraphAPI.request({
      document:  GET_FILTERED_PRODUCTS,
      variables: { category: [category], sort, searchTerm, skip: (page * 10) }
    });

    const products = edges.map(({ node }) => node);

    return [{ pageInfo, products }, null];

  } catch (error: any) {

    console.error(error);
    return [null, error];

  };

};

export const getAllSlugs = async (): Promise<TGetAllSlugsResponse> => {

  try {

    const { products }: { products: Array<{ slug: string }> } = await hygraphAPI.request({
      document: GET_ALL_SLUGS
    });

    const slugs = products.map(({ slug }) => slug);

    return [slugs, null];

  } catch (error: any) {

    console.log(error);
    return [null, error];

  };

};

export const getProductBySlug = async (slug: string): Promise<TGetProductBySlugResponse> => {

  try {

    const { product }: { product: IProductDetails } = await hygraphAPI.request({
      document:  GET_PRODUCT_BY_SLUG,
      variables: { slug }
    });

    return [product, null];

  } catch (error) {

    console.log(error);
    return [null, error];

  };

};
