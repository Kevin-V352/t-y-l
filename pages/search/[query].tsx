import type { NextPage, GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { dbProducts } from '@/database';
import { ISearchPageProps } from '@/interfaces';
import { Search } from '@/pages';

const SearchPage: NextPage<ISearchPageProps> = ({ products }) => {

  return (
    <Search products={products} />
  );

};

export const getServerSideProps: GetServerSideProps = async ({ query, locale = 'es' }) => {

  const [products] = await dbProducts.searchProducts(query as any);

  if (!products) return { redirect: { destination: '/', permanent: false } };

  return {
    props: {
      ...(await serverSideTranslations(locale, ['search'])),
      products
    }
  };

};

export default SearchPage;
