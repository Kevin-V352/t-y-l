import { FC } from 'react';

import * as S from './styles';
import { Props } from './types';

const Chip: FC<Props> = ({ text, customStyles }) => {

  return (
    <S.ChipContainer customStyles={customStyles}>
      <S.ChipText>
        {text}
      </S.ChipText>
    </S.ChipContainer>
  );

};

export default Chip;
