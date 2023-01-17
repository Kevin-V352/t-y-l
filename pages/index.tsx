import type { NextPage, GetServerSideProps } from 'next';

import { dbContent } from '@/database';
import { IHomePageProps } from '@/interfaces';
import { Home } from '@/pages';

const HomePage: NextPage<IHomePageProps> = ({ content }) => {

  return (
    <Home content={content} />
  );

};

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const [content] = await dbContent.getHomeContent();

  // TODO: HACER UNA PAGINA DE ERROR O USAR LA 404
  // if (!content) return { redirect: { destination: '/', permanent: false } };

  return {
    props: {
      content
    }
  };

};

export default HomePage;
