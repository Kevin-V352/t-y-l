import type { NextApiRequest, NextApiResponse } from 'next';

import { hygraphAPI } from '@/apis';
import { IFullOrder, IProductStockResponse } from '@/interfaces';
import { PUBLISH_MANY_PRODUCTS, UPDATE_PRODUCT_QUANTITY } from 'graphql/mutations/product';

import { GET_PRODUCT_QUANTITIES_BY_IDS } from '../../graphql/queries/product';

interface Data {
  message: string;
};

interface ExtendedNextApiRequest extends NextApiRequest {
  body: IFullOrder;
};

type TGetProductQuantitiesByIdResponse =
  | [IProductStockResponse[], null]
  | [null, any];

type TPublishProductsResponse =
  | [number, null]
  | [null, any];

const getProductQuantitiesById = async (ids: string[]): Promise<TGetProductQuantitiesByIdResponse> => {

  try {

    const { products }: { products: IProductStockResponse[] } = await hygraphAPI.request({
      document:  GET_PRODUCT_QUANTITIES_BY_IDS,
      variables: { ids }
    });

    if (products.length === 0) return [null, new Error('There are no products matching the ids provided')];

    return [products, null];

  } catch (error) {

    console.error(error);
    return [null, error];

  };

};

const publishProducts = async (productIds: string[]): Promise<TPublishProductsResponse> => {

  try {

    const { publishManyProducts }: { publishManyProducts: { count: number } } = await hygraphAPI.request({
      document:  PUBLISH_MANY_PRODUCTS,
      variables: { ids: productIds }
    });

    if (publishManyProducts.count === 0) return [null, new Error('No product exists with the provided id')];

    return [publishManyProducts.count, null];

  } catch (error) {

    console.error(error);
    return [null, error];

  };

};

const updateProductQuantitiesByIds = async (products: IProductStockResponse[]): Promise<boolean> => {

  // eslint-disable-next-line @typescript-eslint/promise-function-async
  const promisesToUpdate = products.map((product) => hygraphAPI.request({ document: UPDATE_PRODUCT_QUANTITY, variables: product }));
  const ids = products.map(({ id }) => id);

  try {

    await Promise.all(promisesToUpdate);
    const [responseToPosting] = await publishProducts(ids);

    if (!responseToPosting) return false;

    return true;

  } catch (error) {

    console.error(error);
    return false;

  };

};

const updateOrderQuantity = async (req: ExtendedNextApiRequest, res: NextApiResponse<Data>): Promise<void> => {

  const { paid, products } = req.body.data;

  if (!paid) return res.status(400).send({ message: 'The service only supports paid order updates' });

  const ids = products.map(({ id }) => id);

  const [currentProducts] = await getProductQuantitiesById(ids);

  if (!currentProducts) return res.status(404).send({ message: 'There are no products matching the ids provided' });

  const updatedProducts = currentProducts.map(({ id, stock }) => ({ id, stock: stock - (products.find((product) => product.id === id)?.quantity ?? 0) }));

  const success = await updateProductQuantitiesByIds(updatedProducts);

  if (success) return res.status(201).send({ message: 'Product quantities updated successfully' });
  else return res.status(500).send({ message: 'An error has occurred while trying to update the stock of products' });

};

export default async (req: NextApiRequest, res: NextApiResponse<Data>): Promise<void> => {

  switch (req.method) {

    case 'POST':
      return await updateOrderQuantity(req, res);

    default:
      res.status(400).json({ message: 'Bad request' });

  };

};
