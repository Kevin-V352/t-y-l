/* eslint-disable @typescript-eslint/promise-function-async */
import { FC, memo, useContext, useEffect } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

import { CartContext } from '@/contexts';
import { useQuantity } from '@/hooks';
import { QuantitySelector } from '@/ui';
import { formatters } from '@/utils';

import * as S from './styles';
import { ICartItemProps } from './types';

const propAreEqual = (prevProps: ICartItemProps, nextProps: ICartItemProps): boolean => prevProps.product.id === nextProps.product.id;

const CartItem: FC<ICartItemProps> = ({ product, editable = false }) => {

  const {
    id,
    slug,
    title,
    img,
    stock,
    price,
    quantity: initialQuantity
  } = product;

  const { addProduct, deleteToCart } = useContext(CartContext);

  const {
    quantity,
    disableAdd,
    disableRemove,
    addItem,
    removeItem
  } = useQuantity(stock, initialQuantity);

  const router = useRouter();

  useEffect(() => {

    addProduct({ ...product, quantity });

  }, [quantity]);

  const pluralQuantity = (quantity > 1) ? 'unidades' : 'unidad';

  const redirectToProduct = (): void => {

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    if (editable) router.push(`/product/${slug}`);

  };

  return (
    <S.Container editable={editable}>
      <S.Title onClick={redirectToProduct}>
        {title}
      </S.Title>
      <S.ImageWrapper>
        <Image
          src={img[0].url}
          layout="fill"
        />
      </S.ImageWrapper>
      <S.Price>{formatters.currencyFormat(price * quantity)}</S.Price>
      {
        editable
          ? (
            <>
              <QuantitySelector
                quantity={quantity}
                maxQuantity={stock}
                add={addItem}
                remove={removeItem}
                disableAdd={disableAdd}
                disableRemove={disableRemove}
                customStyles={S.quantitySelectorCustomStyles}
              />
              <S.DeleteButton onClick={() => deleteToCart(id)} />
            </>
            )
          : (
              <S.TotalQuantity>{quantity} {pluralQuantity}</S.TotalQuantity>
            )
      }

    </S.Container>
  );

};

export default memo(CartItem, propAreEqual);
