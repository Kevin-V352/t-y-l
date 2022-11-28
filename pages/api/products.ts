import type { NextApiRequest, NextApiResponse } from 'next';

import { hygraphAPI } from '@/api';
import { ICardProduct } from '@/interfaces';
import { GET_FILTERED_PRODUCTS } from 'graphql/queries/products';

type Data =
  | { message: string }
  | ICardProduct

interface ExtendedNextApiRequest extends NextApiRequest {
  query: {
    category?: string;
    brand?: string;
  };
};

const getFilteredProducts = async (req: ExtendedNextApiRequest, res: NextApiResponse<Data>): Promise<void> => {

  const {
    category = '',
    brand = ''
  } = req.query;

  try {

    const data = await hygraphAPI.request({
      document:  GET_FILTERED_PRODUCTS,
      variables: { category, brand }
    });

    res.status(200).json(data.products);

  } catch (error) {

    console.error(error);
    res.status(400).json({ message: 'An error occurred while trying to obtain the data' });

  };

};

export default async function (req: NextApiRequest, res: NextApiResponse<Data>): Promise<void> {

  switch (req.method) {

    case 'GET':
      return await getFilteredProducts(req, res);

    default:
      return res.status(400).json({ message: 'Bad request' });

  };

};
