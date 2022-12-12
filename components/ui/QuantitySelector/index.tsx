import { FC } from 'react';

import * as S from './styles';
import { IQuantitySelectorProps } from './types';

const QuantitySelector: FC<IQuantitySelectorProps> = (props) => {

  const {
    quantity,
    maxQuantity,
    add,
    remove,
    disableAdd = false,
    disableRemove = false
  } = props;

  return (
    <S.Container>
      <S.TotalQuantity>{`${maxQuantity} disponibles`}</S.TotalQuantity>
      <S.AddButton
        onClick={add}
        disabled={disableAdd}
      />
      <S.Quantity>{quantity}</S.Quantity>
      <S.RemoveButton
        onClick={remove}
        disabled={disableRemove}
      />
    </S.Container>
  );

};

export default QuantitySelector;
