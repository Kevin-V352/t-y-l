import type { NextApiRequest, NextApiResponse } from 'next';

import { hygraphAPI } from '@/apis';
import { GET_CURRENT_PRICE_AND_STOCK_BY_ID } from 'graphql/queries/product';

import { IProductPriceAndStockResponse } from '../../../interfaces/product';

type Data =
  | { message: string }
  | IProductPriceAndStockResponse

const getCurrentPriceAndStock = async (req: NextApiRequest, res: NextApiResponse<Data>): Promise<void> => {

  const { id } = req.query;

  try {

    const { product }: { product: IProductPriceAndStockResponse | null } = await hygraphAPI.request({
      document:  GET_CURRENT_PRICE_AND_STOCK_BY_ID,
      variables: { id }
    });

    if (!product) return res.status(400).json({ message: 'ERROR: There is no product with this id' });

    res.status(200).json(product);

  } catch (error) {

    console.log(error);
    res.status(500).json({ message: 'ERROR: Error when trying to get data from DB' });

  };

};

export default async function (req: NextApiRequest, res: NextApiResponse<Data>): Promise<void> {

  switch (req.method) {

    case 'GET':
      await getCurrentPriceAndStock(req, res);
      break;

    default:
      res.status(200).json({ message: 'Bad request' });

  };

};
