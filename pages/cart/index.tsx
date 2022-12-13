import type { NextPage, GetServerSideProps } from 'next';

import { dbProducts } from '@/database';
import { ICartPageProps, ICartProduct } from '@/interfaces';
import { Cart } from '@/pages';
import { calculators } from '@/utils';

const CartPage: NextPage<ICartPageProps> = ({ products }) => {

  return (
    <Cart products={products} />
  );

};

export const getServerSideProps: GetServerSideProps = async ({ req: { cookies } }) => {

  const defaultResponse = { props: { products: [] } };

  const { cart }: { cart?: string } = cookies;

  if (!cart) return defaultResponse;

  const parsedCart: ICartProduct[] = JSON.parse(cart);

  const ids = parsedCart.map((product) => product.id);

  const [products] = await dbProducts.getProductsByIds(ids);

  if (!products) return defaultResponse;

  return {
    props: {
      products: calculators.revalidateStock(parsedCart, products)
    }
  };

};

export default CartPage;
