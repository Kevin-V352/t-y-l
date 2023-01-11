/* eslint-disable @typescript-eslint/no-misused-promises */
import { FC, useContext, useEffect } from 'react';

import 'react-toastify/dist/ReactToastify.css';

import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';

import { CartContext } from '@/contexts';
import { useCreateOrder, useResponsive } from '@/hooks';
import { MainLayout } from '@/layouts';
import { Button, CartItem, Loader, Notification } from '@/ui';
import { formatters } from '@/utils';

import * as S from './styles';

const Summary: FC = () => {

  const {
    cart,
    totalPrice,
    userData
  } = useContext(CartContext);

  const router = useRouter();

  const { t } = useTranslation('summary');

  const currentResolution = useResponsive();

  const { loading, saveOrder } = useCreateOrder();

  useEffect(() => {

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    if (userData === null) router.push('/cart');

  }, []);

  const contentType = !userData ? 'load' : 'content';

  const isDesktop = currentResolution ? (currentResolution >= 1024) : false;

  const submitOrder = async (): Promise<void> => {

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await saveOrder(userData!, cart, totalPrice);

  };

  const conditionalRender = (type: 'load' | 'content'): JSX.Element | JSX.Element[] => {

    switch (type) {

      case 'content':
        return (
          <>
            <S.Title>{t('page.title')}</S.Title>
            <S.DataList>
              <S.Item>
                <S.TextItem variant='primary'>{t('name')}</S.TextItem>
                <S.TextItem variant='secondary'>{userData?.name}</S.TextItem>
              </S.Item>
              <S.Item>
                <S.TextItem variant='primary'>{t('phone_number')}</S.TextItem>
                <S.TextItem variant='secondary'>{userData?.phoneNumber}</S.TextItem>
              </S.Item>
              {
                userData?.city && (
                  <S.Item>
                    <S.TextItem variant='primary'>{t('city')}</S.TextItem>
                    <S.TextItem variant='secondary'>{userData.city}</S.TextItem>
                  </S.Item>
                )
              }
              {
                userData?.address && (
                  <S.Item>
                    <S.TextItem variant='primary'>{t('address')}</S.TextItem>
                    <S.TextItem variant='secondary'>{userData.address}</S.TextItem>
                  </S.Item>
                )
              }
              <S.Item>
                <S.TextItem variant='primary'>{t('payment_method.label')}</S.TextItem>
                <S.TextItem variant='secondary'>{t(`payment_method.${userData?.paymentMethod}`)}</S.TextItem>
              </S.Item>
              <S.Item>
                <S.TextItem variant='primary'>{t('delivery_method.label')}</S.TextItem>
                <S.TextItem variant='secondary'>{t(`delivery_method.${userData?.deliveryMethod}`)}</S.TextItem>
              </S.Item>
              <S.Item>
                <S.TextItem variant='primary'>{t('totalPrice')}</S.TextItem>
                <S.TextItem variant='secondary'>{formatters.currencyFormat(totalPrice)}</S.TextItem>
              </S.Item>
              {
                isDesktop && (
                  <Button
                    fluid
                    text={t('btn_1')}
                    variant='primary'
                    onClick={submitOrder}
                    disabled={loading}
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
                  text={t('btn_1')}
                  variant='primary'
                  onClick={submitOrder}
                  disabled={loading}
                />
              )
            }
          </>
        );

      default:
        return <Loader />;

    };

  };

  return (
    <MainLayout
      title={`T&L | ${t('page.title')}`}
      desc=""
    >
      <S.Container $loading={(contentType === 'load')}>
        {conditionalRender(contentType)}
      </S.Container>
      <Notification />
    </MainLayout>
  );

};

export default Summary;
