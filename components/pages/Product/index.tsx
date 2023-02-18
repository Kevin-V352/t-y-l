/* eslint-disable import/no-unresolved */
import { FC, useContext, useState, useRef, useEffect } from 'react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Modal } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { CartContext } from '@/contexts';
import { useGetExtraProductData, useUpdateCart } from '@/hooks';
import { ICartProduct, IProductDetailsPageProps } from '@/interfaces';
import { MainLayout } from '@/layouts';
import {
  Skeleton,
  Button,
  QuantitySelector,
  Checkbox,
  ProductCard,
  Notification
} from '@/ui';
import { formatters } from '@/utils';

import * as S from './styles';

const Product: FC<IProductDetailsPageProps> = ({ product }) => {

  const {
    id,
    img,
    title,
    description,
    slug
  } = product;

  const {
    cookiesLoaded,
    updatedProducts,
    hideMessage1,
    hideMessageInProducts,
    addProduct,
    getCurrentQuantity
  } = useContext(CartContext);

  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);

  const hideConfirmationMessage = useRef<boolean>(false);
  const currentQuantity = useRef<number>(0);

  const { t } = useTranslation('product');

  useUpdateCart();

  const {
    currentStock,
    currentPrice,
    relatedProducts,
    isLoading: extraProductDataAreLoading,
    isError
  } = useGetExtraProductData(id);

  const loadingQuantity = (!cookiesLoaded || !updatedProducts);

  // TODO: REPLACE THIS
  const isDesktop = useMediaQuery('(min-width:1024px)');
  const bigScreen = useMediaQuery('(min-width:1920px)');

  //* Condition to maintain the loading animation even when the request fails
  const loadingExtraData = (extraProductDataAreLoading || isError);

  const addToCart = (): void => {

    const formattedProduct: ICartProduct = {
      id,
      img,
      title,
      slug,
      quantity: currentQuantity.current,
      price:    currentPrice ?? 0,
      stock:    currentStock ?? 0
    };

    addProduct(formattedProduct);

    if (!hideMessage1) setOpenConfirmModal(true);

  };

  const handleClose = (): void => {

    setOpenConfirmModal(false);
    if (hideConfirmationMessage.current) hideMessageInProducts();

  };

  useEffect(() => {

    if (isError) {

      toast.error(
        t('error_notification_get_extra_data').toString(),
        { autoClose: false }
      );

    };

  }, [isError]);

  return (
    <MainLayout
      title={`T&L | ${title}`}
      desc=''
    >
      <S.Container>
        <S.SwiperImageWrapper>
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
        </S.SwiperImageWrapper>
        <S.Content>
          <S.Title>{title}</S.Title>
          {
            loadingExtraData
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
            initialValue={getCurrentQuantity(id) ?? 1}
            maxQuantity={(currentStock ?? 0)}
            $loading={(loadingExtraData || loadingQuantity)}
            // eslint-disable-next-line padded-blocks
            onChange={(quantity) => { currentQuantity.current = quantity; }}
          />
          <Button
            fluid
            text={t('btn_1')}
            variant='primary'
            onClick={addToCart}
            disabled={(loadingExtraData || loadingQuantity)}
          />
          {
            isDesktop && <S.Description>{description}</S.Description>
          }
        </S.Content>
        {
          !isDesktop && <S.Description>{description}</S.Description>
        }
        {
          (relatedProducts && relatedProducts.length > 0) && (
            <S.RelatedProductsWrapper>
              <S.Title>Productos relacionados</S.Title>
              <S.SwiperProductsWrapper>
                <Swiper
                  modules={[Navigation]}
                  slidesPerView={1.2}
                  spaceBetween={20}
                  navigation
                  breakpoints={{
                    768:  { slidesPerView: 2.2 },
                    1024: { slidesPerView: 3.2, allowTouchMove: false },
                    1400: { slidesPerView: 4.2 }
                  }}
                >
                  {
                    relatedProducts.map((product) => (
                      <SwiperSlide key={product.slug}>
                        <ProductCard product={product} />
                      </SwiperSlide>
                    ))
                  }
                </Swiper>
              </S.SwiperProductsWrapper>
            </S.RelatedProductsWrapper>
          )
        }
      </S.Container>
      <Modal
        open={openConfirmModal}
        onClose={handleClose}
        aria-labelledby="confirm-modal-title"
        aria-describedby="confirm-modal-description"
      >
        <S.ConfirmModalWrapper>
          <S.Title id="confirm-modal-title">El producto se añadio al carrito</S.Title>
          <Button
            text="Seguir comprando"
            variant="primary"
            onClick={handleClose}
          />
          <Link
            href="/cart"
            prefetch={false}
          >
            <Button
              text="Ir al carrito"
              variant="primary"
            />
          </Link>
          <Checkbox
            label="No quiero volver a ver esto"
            // eslint-disable-next-line padded-blocks
            onChange={(_, checked) => { hideConfirmationMessage.current = checked; }}
          />
        </S.ConfirmModalWrapper>
      </Modal>
      <Notification />
    </MainLayout>
  );

};

export default Product;
