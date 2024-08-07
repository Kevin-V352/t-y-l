import { FC } from 'react';

import useMediaQuery from '@mui/material/useMediaQuery';

import { useQuantity } from '@/hooks';
import { Skeleton } from '@/ui';

import * as S from './styles';
import { IQuantitySelectorProps, IQuantitySelectorContentProps } from './types';

const Content: FC<IQuantitySelectorContentProps> = ({ maxQuantity, initialValue, onChange }) => {

  const {
    quantity,
    disableAdd,
    disableRemove,
    addItem,
    removeItem
  } = useQuantity(maxQuantity, initialValue, onChange);

  return (
    <>
      <S.TotalQuantity>{(maxQuantity > 1) ? `${maxQuantity} disponibles` : '¡Último disponible!'}</S.TotalQuantity>
      <S.WrapperButton
        gridArea="removeButton"
        disabled={disableRemove}
      >
        <S.RemoveIcon
          onClick={removeItem}
          disabled={disableRemove}
        />
      </S.WrapperButton>
      <S.Quantity>{quantity}</S.Quantity>
      <S.WrapperButton
        gridArea="addButton"
        disabled={disableRemove}
      >
        <S.AddIcon
          onClick={addItem}
          disabled={disableAdd}
        />
      </S.WrapperButton>
    </>
  );

};

const QuantitySelector: FC<IQuantitySelectorProps> = (props) => {

  const {
    maxQuantity,
    initialValue,
    customStyles,
    $loading,
    onChange
  } = props;

  const bigScreen = useMediaQuery('(min-width:1920px)');

  return (
    <S.Container
      $loading={$loading}
      customStyles={customStyles}
    >
      {
        $loading
          ? (
            <Skeleton
              variant="rounded"
              animation="wave"
              width={bigScreen ? 140 : 115}
              height={bigScreen ? 90 : 78}
            />
            )
          : (
            <Content
              maxQuantity={maxQuantity}
              initialValue={initialValue}
              onChange={onChange}
            />
            )
      }
    </S.Container>
  );

};

export default QuantitySelector;
