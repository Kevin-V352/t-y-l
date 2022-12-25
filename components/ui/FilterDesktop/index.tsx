import { FC } from 'react';

import { FilterContent } from '@/ui';

import * as S from './styles';
import { IFilterDesktopProps } from './types';

const FilterDesktop: FC<IFilterDesktopProps> = ({ customStyles }) => {

  return (
    <S.Container customStyles={customStyles}>
      <S.Title>Categorias</S.Title>
      <FilterContent />
    </S.Container>
  );

};

export default FilterDesktop;
