import { FC, useContext } from 'react';

import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';

import { CartContext } from '@/contexts';
import { useUpdateCart } from '@/hooks';
import { MainLayout } from '@/layouts';
import { Button, CartItem } from '@/ui';
import { formatters } from '@/utils';

import * as S from './styles';

const Cart: FC = () => {

  const { cart, cookiesLoaded, updatedProducts, totalPrice } = useContext(CartContext);

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
              <S.SummaryText>Total:</S.SummaryText>
              <S.SummaryPrice>{formatters.currencyFormat(totalPrice)}</S.SummaryPrice>
              <Link href="/checkout/address">
                <Button
                  text={t('btn_1')}
                  variant='primary'
                  gridArea='btn'
                />
              </Link>
            </S.SummaryWrapper>
          </>
        );

      default:
        return (
          <S.LoaderWrapper>
            <S.Title>Tu carrito está vacío</S.Title>
            <S.HighlightedText>¿No sabés qué comprar? ¡Varios de productos te esperan!</S.HighlightedText>
            <Button
              text={t('btn_2')}
              variant='primary'
            />
          </S.LoaderWrapper>
        );

    };

  };

  return (
    <MainLayout
      title={`T&L | ${t('page.title')}`}
      desc="This is the cart"
    >
      <S.Container status={contentType}>
        <S.Title>{t('page.title')}</S.Title>
        {conditionalRender(contentType)}
      </S.Container>
    </MainLayout>
  );

};

export default Cart;
