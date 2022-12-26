/* eslint-disable import/no-unresolved */
import { FC, useContext } from 'react';

import 'swiper/css';
import 'swiper/css/pagination';

import useMediaQuery from '@mui/material/useMediaQuery';
import Image from 'next/image';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { CartContext } from '@/contexts';
import { useCurrentPrice, useQuantity, useUpdateCart } from '@/hooks';
import { ICartProduct, IProductDetailsPageProps } from '@/interfaces';
import { MainLayout } from '@/layouts';
import { Skeleton, Button, QuantitySelector } from '@/ui';
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

  const { cookiesLoaded, updatedProducts, addProduct, getCurrentQuantity } = useContext(CartContext);

  useUpdateCart();

  const {
    quantity,
    disableAdd,
    disableRemove,
    addItem,
    removeItem
  } = useQuantity(stock, (getCurrentQuantity(id) ?? undefined));

  const { currentPrice, isLoading: currentPriceIsLoading } = useCurrentPrice(id);

  const loadingQuantity = (!cookiesLoaded || !updatedProducts);

  // TODO: REPLACE THIS
  const isDesktop = useMediaQuery('(min-width:1024px)');
  const bigScreen = useMediaQuery('(min-width:1920px)');

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
          {
            currentPriceIsLoading
              ? (
                  <Skeleton
                    variant="rounded"
                    animation="wave"
                    width={150}
                    height={bigScreen ? 44 : 38}
                  />
                )
              : (
                  <S.Price>{formatters.currencyFormat(currentPrice)}</S.Price>
                )
          }
          <QuantitySelector
            quantity={quantity}
            maxQuantity={stock}
            add={addItem}
            remove={removeItem}
            disableAdd={disableAdd}
            disableRemove={disableRemove}
            $loading={loadingQuantity}
          />
          <Button
            fluid
            text='Agregar al carrito'
            variant='primary'
            onClick={addToCart}
            disabled={(currentPriceIsLoading || loadingQuantity)}
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
