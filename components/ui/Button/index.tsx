import { FC } from 'react';

import * as S from './styles';
import { IButtonProps } from './types';

const Button: FC<IButtonProps> = (props) => {

  return (
    <S.Wrapper {...props}>
      {props.text}
      {props.icon}
    </S.Wrapper>
  );

};

export default Button;
