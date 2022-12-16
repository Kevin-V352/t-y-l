import { FC, memo, useContext, useEffect } from 'react';

import Image from 'next/image';

import { CartContext } from '@/contexts';
import { useQuantity } from '@/hooks';
import { QuantitySelector } from '@/ui';
import { formatters } from '@/utils';

import * as S from './styles';
import { ICartItemProps } from './types';

const propAreEqual = (prevProps: ICartItemProps, nextProps: ICartItemProps): boolean => prevProps.product.id === nextProps.product.id;

const CartItem: FC<ICartItemProps> = ({ product }) => {

  const {
    id,
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

  useEffect(() => {

    addProduct({ ...product, quantity });

  }, [quantity]);

  return (
    <S.Container>
      <S.Title>{title}</S.Title>
      <S.ImageWrapper>
        <Image
          src={img[0].url}
          layout="fill"
        />
      </S.ImageWrapper>
      <S.Price>{formatters.currencyFormat(price * quantity)}</S.Price>
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
    </S.Container>
  );

};

export default memo(CartItem, propAreEqual);
