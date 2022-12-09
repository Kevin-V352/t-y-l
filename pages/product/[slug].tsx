import type { NextPage, GetStaticPaths } from 'next';
import { GetStaticProps } from 'next';

import { dbProducts } from '@/database';
import { IProductDetailsPageProps } from '@/interfaces';
import { Product } from '@/pages';

const ProductPage: NextPage<IProductDetailsPageProps> = ({ product }) => {

  return (
    <Product product={product} />
  );

};

export const getStaticPaths: GetStaticPaths = async () => {

  const [slugs] = await dbProducts.getAllSlugs();

  if (!slugs) throw new Error('An error occurred while obtaining the slugs');

  return {
    paths:    slugs.map((slug) => ({ params: { slug } })),
    fallback: 'blocking'
  };

}; ;

export const getStaticProps: GetStaticProps = async ({ params }) => {

  const { slug } = params as { slug: string };

  const [product] = await dbProducts.getProductBySlug(slug);

  if (!product) {

    return {
      redirect: {
        destination: '/',
        permanent:   false
      }
    };

  };

  return {
    props: {
      product
    }
  };

};

export default ProductPage;
