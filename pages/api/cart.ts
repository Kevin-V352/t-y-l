import type { NextApiRequest, NextApiResponse } from 'next';

import { hygraphAPI } from '@/apis';
import { ICartProduct } from '@/interfaces';
import { calculators } from '@/utils';
import { GET_PRODUCTS_BY_IDS } from 'graphql/queries/products';

type Data =
  | { message: string }
  | ICartProduct[]

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    cartItems: ICartProduct[];
  };
};

const getCartProducts = async (req: ExtendedNextApiRequest, res: NextApiResponse<Data>): Promise<void> => {

  const { cartItems = [] } = req.body;

  const ids = cartItems.map(({ id }) => id);

  try {

    const { products }: { products: ICartProduct[] } = await hygraphAPI.request({
      document:  GET_PRODUCTS_BY_IDS,
      variables: { ids }
    });

    res.status(200).json(calculators.revalidateStock(cartItems, products));

  } catch (error) {

    console.log(error);
    res.status(200).json({ message: 'Error when trying to get data from DB' });

  };

};

export default async function (req: NextApiRequest, res: NextApiResponse<Data>): Promise<void> {

  switch (req.method) {

    case 'POST':
      return await getCartProducts(req, res);

    default:
      res.status(400).json({ message: 'Bad request' });

  };

}
