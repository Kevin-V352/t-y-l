import type { NextApiRequest, NextApiResponse } from 'next';

import { hygraphAPI } from '@/apis';
import { ICardProduct, ICardProductByCategoryResponse, IProductExtraDataResponse } from '@/interfaces';
import { GET_EXTRA_DATA_BY_ID, GET_PRODUCTS_BY_CATEGORY } from 'graphql/queries/product';

type Data =
  | { message: string }
  | { productDetails: IProductExtraDataResponse; relatedProducts: ICardProduct[] };

// TODO: Pass this to .env
const invalidCategories = [
  'popular',
  'drinks_without_alcohol',
  'soft_driks',
  'non_carbonated_drinks',
  'alcoholic_drinks',
  'others',
  'product'
];

const getCurrentPriceAndStock = async (req: NextApiRequest, res: NextApiResponse<Data>): Promise<void> => {

  const { id } = req.query;
  let productDetails: IProductExtraDataResponse | null = null;
  let relatedProducts: ICardProduct[] = [];

  try {

    const { product }: { product: IProductExtraDataResponse | null } = await hygraphAPI.request({
      document:  GET_EXTRA_DATA_BY_ID,
      variables: { id }
    });

    if (!product) return res.status(400).json({ message: 'ERROR: There is no product with this id' });

    productDetails = product;

  } catch (error) {

    console.error(error);
    return res.status(500).json({ message: 'ERROR: Error when trying to get data from DB' });

  };

  const mainCategory = productDetails.categories.filter((productCategory) => !invalidCategories.includes(productCategory))[0];

  if (mainCategory) {

    try {

      const { products }: { products: ICardProductByCategoryResponse[] | null } = await hygraphAPI.request({
        document:  GET_PRODUCTS_BY_CATEGORY,
        variables: { category: [mainCategory] }
      });

      relatedProducts = products
        ? products
          .filter(({ id: productId }) => (productId !== id))
          .map(({ img, title, price, slug }) => ({ img, title, price, slug }))
        : [];

    } catch (error) {

      console.error(error);

    };

  };

  res.status(200).json({ productDetails, relatedProducts });

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
