import { FC } from 'react';

import Head from 'next/head';

import { Navbar } from '@/ui';

import * as S from './styles';
import { Props } from './types';

const MainLayout: FC<Props> = ({ title, desc, children }) => {

  return (
    <S.Container>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={desc} />
      </Head>
      <Navbar />
      <S.MainContent>
        {children}
      </S.MainContent>
    </S.Container>
  );

};

export default MainLayout;
