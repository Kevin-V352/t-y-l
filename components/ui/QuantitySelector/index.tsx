import { FC } from 'react';

import * as S from './styles';
import { IQuantitySelectorProps } from './types';

const QuantitySelector: FC<IQuantitySelectorProps> = ({ quantity, maxQuantity, add, remove }) => {

  return (
    <S.Container>
      <S.TotalQuantity>{`${maxQuantity} disponibles`}</S.TotalQuantity>
      <S.AddButton onClick={add} />
      <S.Quantity>{quantity}</S.Quantity>
      <S.RemoveButton onClick={remove} />
    </S.Container>
  );

};

export default QuantitySelector;
