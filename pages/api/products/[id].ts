import type { NextApiRequest, NextApiResponse } from 'next';

import { hygraphAPI } from '@/api';
import { GET_CURRENT_PRICE_OF_PRODUCT } from 'graphql/queries/products';

type Data =
  | { message: string }
  | { price: number }

const getCurrentPriceOfProduct = async (req: NextApiRequest, res: NextApiResponse<Data>): Promise<void> => {

  const { id } = req.query;

  try {

    const { product }: { product: { price: number } | null } = await hygraphAPI.request({
      document:  GET_CURRENT_PRICE_OF_PRODUCT,
      variables: { id }
    });

    if (!product) return res.status(400).json({ message: 'There is no product with this id' });

    res.status(200).json(product);

  } catch (error) {

    console.log(error);
    res.status(400).json({ message: 'Error when trying to get data from DB' });

  };

};

export default async function (req: NextApiRequest, res: NextApiResponse<Data>): Promise<void> {

  switch (req.method) {

    case 'GET':
      await getCurrentPriceOfProduct(req, res);
      break;

    default:
      res.status(200).json({ message: 'Bad request' });

  };

};
