import { FC } from 'react';

import * as S from './styles';
import { Props } from './types';

const CategoryTag: FC<Props> = ({ title, customStyles, id }) => (
  <S.Wrapper
    id={id}
    customStyles={customStyles}
  >
    <S.StarIcon />
    <S.Title>{title}</S.Title>
    <S.StarIcon />
  </S.Wrapper>
);

export default CategoryTag;
