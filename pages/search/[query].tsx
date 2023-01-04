import type { NextPage, GetServerSideProps } from 'next';

import { dbProducts } from '@/database';
import { ISearchPageProps } from '@/interfaces';
import { Search } from '@/pages';

const SearchPage: NextPage<ISearchPageProps> = ({ products }) => {

  return (
    <Search products={products} />
  );

};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {

  const [products] = await dbProducts.searchProducts(query as any);

  if (!products) return { redirect: { destination: '/', permanent: false } };

  return {
    props: {
      products
    }
  };

};

export default SearchPage;
