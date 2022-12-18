import { FC } from 'react';

import useMediaQuery from '@mui/material/useMediaQuery';

import { Skeleton } from '@/ui';

import * as S from './styles';
import { IQuantitySelectorProps } from './types';

const QuantitySelector: FC<IQuantitySelectorProps> = (props) => {

  const {
    quantity,
    maxQuantity,
    add,
    remove,
    disableAdd = false,
    disableRemove = false,
    customStyles,
    $loading
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
              <>
                <S.TotalQuantity>{(maxQuantity > 1) ? `${maxQuantity} disponibles` : '¡Último disponible!'}</S.TotalQuantity>
                <S.AddButton
                  onClick={add}
                  disabled={disableAdd}
                />
                <S.Quantity>{quantity}</S.Quantity>
                <S.RemoveButton
                  onClick={remove}
                  disabled={disableRemove}
                />
              </>
            )
      }
    </S.Container>
  );

};

export default QuantitySelector;
