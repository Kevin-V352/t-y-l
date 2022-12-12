/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { FC } from 'react';

import { useRouter } from 'next/router';

import { formatters } from '@/utils';

import * as S from './styles';
import { Props } from './types';

const ProductCard: FC<Props> = ({ product }) => {

  const { img, title, price, slug } = product;

  const router = useRouter();

  return (
    <S.Container>
      <S.Image src={img[0].url} />
      <S.Title>{title}</S.Title>
      <S.Price>{formatters.currencyFormat(price)}</S.Price>
      <S.Button
        onClick={() => router.push(`/product/${slug}`)}
      >
        Detalles
      </S.Button>
    </S.Container>
  );

};

export default ProductCard;
