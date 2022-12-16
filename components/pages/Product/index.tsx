/* eslint-disable import/no-unresolved */
import { FC, useContext } from 'react';

import 'swiper/css';
import 'swiper/css/pagination';

import Image from 'next/image';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { CartContext } from '@/contexts';
import { useQuantity, useResponsive } from '@/hooks';
import { ICartProduct, IProductDetailsPageProps } from '@/interfaces';
import { MainLayout } from '@/layouts';
import { Button, QuantitySelector } from '@/ui';
import { formatters } from '@/utils';

import * as S from './styles';

const Product: FC<IProductDetailsPageProps> = ({ product }) => {

  const {
    id,
    img,
    title,
    price,
    description,
    stock,
    slug
  } = product;

  const { addProduct, getCurrentQuantity } = useContext(CartContext);

  const {
    quantity,
    disableAdd,
    disableRemove,
    addItem,
    removeItem
  } = useQuantity(stock, (getCurrentQuantity(id) ?? undefined));

  const currentResolution = useResponsive();

  const isDesktop = currentResolution ? (currentResolution >= 1024) : false;

  const addToCart = (): void => {

    const formattedProduct: ICartProduct = {
      id,
      img,
      title,
      price,
      quantity,
      slug,
      stock
    };

    addProduct(formattedProduct);

  };

  return (
    <MainLayout
      title={`T&L | ${title}`}
      desc=''
    >
      <S.Container>
        <S.SwiperWrapper>
          <Swiper
            modules={[Pagination]}
            slidesPerView={1}
            pagination
          >
            {
              img.map(({ url }) => (
                <SwiperSlide key={url}>
                  <S.ImgWrapper>
                    <Image
                      src={url}
                      layout="fill"
                    />
                  </S.ImgWrapper>
                </SwiperSlide>
              ))
            }
          </Swiper>
        </S.SwiperWrapper>
        <S.Content>
          <S.Title>{title}</S.Title>
          <S.Price>{formatters.currencyFormat(price)}</S.Price>
          <QuantitySelector
            quantity={quantity}
            maxQuantity={stock}
            add={addItem}
            remove={removeItem}
            disableAdd={disableAdd}
            disableRemove={disableRemove}
          />
          <Button
            text='Agregar al carrito'
            variant='primary'
            fluid
            onClick={addToCart}
          />
          {
            isDesktop && <S.Description>{description}</S.Description>
          }
        </S.Content>
        {
          !isDesktop && <S.Description>{description}</S.Description>
        }
      </S.Container>
    </MainLayout>
  );

};

export default Product;
