import { FC, useContext } from 'react';

import { CartContext } from '@/contexts';
import { useCart } from '@/hooks';
import { MainLayout } from '@/layouts';
import { CartItem } from '@/ui';

import * as S from './styles';

const Cart: FC = () => {

  const { cart, isLoaded: contextLoaded } = useContext(CartContext);
  const { products, isLoading: productsLoading } = useCart(cart, contextLoaded);

  if (!contextLoaded || productsLoading) return <h1>CARGANDO</h1>;

  return (
    <MainLayout
      title="Carrito"
      desc="This is the cart"
    >
      <S.Container>
        <S.Title>Carrito</S.Title>
        {
          products.map((product) => (
            <CartItem
              key={product.id}
              product={product}
            />
          ))
        }
      </S.Container>
    </MainLayout>
  );

};

export default Cart;
