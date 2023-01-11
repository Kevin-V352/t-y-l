/* eslint-disable react/display-name */
import { FC, forwardRef, ForwardedRef } from 'react';

import * as S from './styles';
import { IButtonProps } from './types';

const Button: FC<IButtonProps> = forwardRef((props, ref) => {

  return (
    <S.Wrapper
      ref={ref as ForwardedRef<HTMLButtonElement>}
      {...props}
    >
      {props.text}
      {props.icon}
    </S.Wrapper>
  );

});

export default Button;
