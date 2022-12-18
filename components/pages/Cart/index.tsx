import { FC, useContext } from 'react';

import { CartContext } from '@/contexts';
import { useUpdateCart } from '@/hooks';
import { MainLayout } from '@/layouts';
import { Button, CartItem } from '@/ui';

import * as S from './styles';

const Cart: FC = () => {

  const { cart, cookiesLoaded, updatedProducts } = useContext(CartContext);

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
          cart.map((product) => (
            <CartItem
              key={product.id}
              product={product}
            />
          ))
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
      <S.Container>
        <S.Title>Carrito</S.Title>
        {conditionalRender(contentType)}
      </S.Container>
    </MainLayout>
  );

};

export default Cart;
