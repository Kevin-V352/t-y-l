import type { NextPage, GetServerSideProps } from 'next';

import { dbProducts } from '@/database';
import { IPaginatedProducts } from '@/interfaces';
import { Search } from '@/pages';

const SearchPage: NextPage<IPaginatedProducts> = (props) => {

  return (
    <Search {...props} />
  );

};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {

  const [pageData] = await dbProducts.searchProducts(query as any);

  if (!pageData) return { redirect: { destination: '/', permanent: false } };

  return {
    props: {
      ...pageData
    }
  };

};

export default SearchPage;
