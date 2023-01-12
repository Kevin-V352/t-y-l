import type { GetServerSideProps, NextPage } from 'next';

import { dbOrders } from '@/database';
import { IOpenChatPageProps } from '@/interfaces';
import { OpenChat } from '@/pages';

const HomePage: NextPage<IOpenChatPageProps> = ({ order }) => {

  return (
    <OpenChat order={order} />
  );

};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {

  const { id } = query;

  const [order] = await dbOrders.checkForOrder(id as string);

  if (!order) return { redirect: { destination: '/', permanent: false } };

  return {
    props: {
      order
    }
  };

};

export default HomePage;
