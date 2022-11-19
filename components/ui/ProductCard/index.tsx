import { FC } from 'react';

import * as S from './styles';
import { Props } from './types';

const ProductCard: FC<Props> = ({ img, title, price }) => (
  <S.Container>
    <S.Image src={img} />
    <S.Title>{title}</S.Title>
    <S.Price>{`$ ${price}`}</S.Price>
    <S.Button>Detalles</S.Button>
  </S.Container>
);

export default ProductCard;
