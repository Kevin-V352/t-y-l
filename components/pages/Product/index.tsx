import { FC } from 'react';

import Image from 'next/image';

import { IProductDetailsPageProps } from '@/interfaces';
import { MainLayout } from '@/layouts';
import { Button, QuantitySelector } from '@/ui';
import { formatters } from '@/utils';
import useQuantity from 'hooks/useQuantity';

import * as S from './styles';

const Product: FC<IProductDetailsPageProps> = ({ product }) => {

  const {
    img,
    title,
    price,
    description,
    stock
  } = product;

  const { quantity, addItem, removeItem } = useQuantity(stock);

  return (
    <MainLayout
      title={`T&L | ${title}`}
      desc=''
    >
      <S.Container>
        <S.ImgWrapper>
          <Image
            src={img[0].url}
            layout="fill"
          />
        </S.ImgWrapper>
        <S.Content>
          <S.Title>{title}</S.Title>
          <S.Price>{formatters.currencyFormat(price)}</S.Price>
          <QuantitySelector
            quantity={quantity}
            maxQuantity={stock}
            add={addItem}
            remove={removeItem}
          />
          <Button
            text='Agregar al carrito'
            variant='primary'
            fluid
          />
          <S.Description>{description}</S.Description>
        </S.Content>
      </S.Container>
    </MainLayout>
  );

};

export default Product;
