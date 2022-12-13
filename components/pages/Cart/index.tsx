import { FC } from 'react';

import { MainLayout } from '@/layouts';
import { ICartPageProps } from 'interfaces/pagesProps';

import * as S from './styles';

const Cart: FC<ICartPageProps> = ({ products }) => {

  console.log(products);

  return (
    <MainLayout
      title="Carrito"
      desc="This is the cart"
    >
      <S.Container>
        {/* {
          cart.map(() => (
            <CartItem />
          ))
        } */}
      </S.Container>
    </MainLayout>
  );

};

export default Cart;
