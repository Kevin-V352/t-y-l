import { FC, useContext } from 'react';

import Link from 'next/link';

import { CartContext } from '@/contexts';
import { useUpdateCart } from '@/hooks';
import { MainLayout } from '@/layouts';
import { Button, CartItem } from '@/ui';
import { formatters } from '@/utils';

import * as S from './styles';

const Cart: FC = () => {

  const { cart, cookiesLoaded, updatedProducts, totalPrice } = useContext(CartContext);

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
                  />
                ))
              }
            </S.ProductList>
            <S.SummaryWrapper>
              <S.SummaryText>Total:</S.SummaryText>
              <S.SummaryPrice>{formatters.currencyFormat(totalPrice)}</S.SummaryPrice>
              <Link href="/checkout/address">
                <Button
                  text='Continuar compra'
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
              text="Descubrir ofertas"
              variant='primary'
            />
          </S.LoaderWrapper>
        );

    };

  };

  return (
    <MainLayout
      title="Carrito"
      desc="This is the cart"
    >
      <S.Container status={contentType}>
        <S.Title>Carrito</S.Title>
        {conditionalRender(contentType)}
      </S.Container>
    </MainLayout>
  );

};

export default Cart;
