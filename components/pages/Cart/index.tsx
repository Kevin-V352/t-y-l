import { FC, useContext, useEffect } from 'react';

import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { toast } from 'react-toastify';

import { CartContext } from '@/contexts';
import { useUpdateCart } from '@/hooks';
import { MainLayout } from '@/layouts';
import { Button, CartItem, Notification } from '@/ui';
import { formatters } from '@/utils';

import * as S from './styles';

const Cart: FC = () => {

  const {
    cart,
    cookiesLoaded,
    updatedProducts,
    totalPrice,
    error
  } = useContext(CartContext);

  const { t } = useTranslation('cart');

  useUpdateCart();

  const contentType = (!cookiesLoaded || !updatedProducts) ? 'load' : (cart.length >= 1) ? 'products' : 'empty';

  const conditionalRender = (type: 'load' | 'products' | 'empty'): JSX.Element | JSX.Element[] => {

    switch (type) {

      case 'load':
        return (
          <S.LoaderWrapper>
            <S.CustomLoader />
          </S.LoaderWrapper>
        );

      case 'products':
        return (
          <>
            <S.ProductList>
              {
                cart.map((product) => (
                  <CartItem
                    key={product.id}
                    product={product}
                    editable
                  />
                ))
              }
            </S.ProductList>
            <S.SummaryWrapper>
              <S.SummaryTextWrapper>
                <S.SummaryText>{t('summary_text')}</S.SummaryText>
                <S.SummaryPrice>{formatters.currencyFormat(totalPrice)}</S.SummaryPrice>
              </S.SummaryTextWrapper>
              <Link href="/checkout/address">
                <Button
                  text={t('btn_1')}
                  variant='primary'
                />
              </Link>
            </S.SummaryWrapper>
          </>
        );

      default:
        return (
          <S.LoaderWrapper>
            <S.Title>{t('empty_title')}</S.Title>
            <S.HighlightedText>{t('empty_description')}</S.HighlightedText>
            <Link href="/">
              <Button
                text={t('btn_2')}
                variant='primary'
              />
            </Link>
          </S.LoaderWrapper>
        );

    };

  };

  useEffect(() => {

    if (error) {

      toast.error(
        t('error_notification_update_cart').toString(),
        { autoClose: false }
      );

    }

  }, [error]);

  return (
    <MainLayout
      title={`T&L | ${t('page.title')}`}
      desc="This is the cart"
    >
      <S.Container status={contentType}>
        <S.Title>{t('page.title')}</S.Title>
        {conditionalRender(contentType)}
      </S.Container>
      <Notification />
    </MainLayout>
  );

};

export default Cart;
