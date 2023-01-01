import { FC, useContext, useEffect } from 'react';

import { useRouter } from 'next/router';

import { CartContext } from '@/contexts';
import { useResponsive } from '@/hooks';
import { MainLayout } from '@/layouts';
import { Button, CartItem } from '@/ui';
import { formatters } from '@/utils';

import * as S from './styles';

const Summary: FC = () => {

  const {
    cart,
    totalPrice,
    userData
  } = useContext(CartContext);

  const router = useRouter();

  const currentResolution = useResponsive();

  useEffect(() => {

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    if (userData === null) router.push('/cart');

  }, []);

  const isDesktop = currentResolution ? (currentResolution >= 1024) : false;

  if (!userData) return null;

  const {
    name,
    phone,
    paymentMethod,
    deliveryMethod
  } = userData;

  return (
    <MainLayout
      title="Resumen de orden"
      desc=""
    >
      <S.Container>
        <S.Title>Resumen de orden</S.Title>
        <S.DataList>
          <S.Item>
            <S.TextItem variant='primary'>Nombre:</S.TextItem>
            <S.TextItem variant='secondary'>{name}</S.TextItem>
          </S.Item>
          <S.Item>
            <S.TextItem variant='primary'>Teléfono:</S.TextItem>
            <S.TextItem variant='secondary'>{phone}</S.TextItem>
          </S.Item>
          {
            userData.city && (
              <S.Item>
                <S.TextItem variant='primary'>Ciudad:</S.TextItem>
                <S.TextItem variant='secondary'>{userData.city}</S.TextItem>
              </S.Item>
            )
          }
          {
            userData.address && (
              <S.Item>
                <S.TextItem variant='primary'>Dirección:</S.TextItem>
                <S.TextItem variant='secondary'>{userData.address}</S.TextItem>
              </S.Item>
            )
          }
          <S.Item>
            <S.TextItem variant='primary'>Método de pago:</S.TextItem>
            <S.TextItem variant='secondary'>{paymentMethod}</S.TextItem>
          </S.Item>
          <S.Item>
            <S.TextItem variant='primary'>Método de entrega:</S.TextItem>
            <S.TextItem variant='secondary'>{deliveryMethod}</S.TextItem>
          </S.Item>
          <S.Item>
            <S.TextItem variant='primary'>Precio total: </S.TextItem>
            <S.TextItem variant='secondary'>{formatters.currencyFormat(totalPrice)}</S.TextItem>
          </S.Item>
          {
            isDesktop && (
              <Button
                text='Crear orden'
                variant='primary'
                fluid
              />
            )
          }
        </S.DataList>
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
        {
          !isDesktop && (
            <Button
              text='Crear orden'
              variant='primary'
            />
          )
        }
      </S.Container>
    </MainLayout>
  );

};

export default Summary;
