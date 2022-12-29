/* eslint-disable react/display-name */
import { FC, forwardRef } from 'react';

import { TextFieldProps } from '@mui/material';
import { useTheme } from 'styled-components';

import * as S from './styles';

const TextInput: FC<TextFieldProps> = forwardRef((props, ref) => {

  const styledTheme = useTheme();

  return (
    <S.CustomTextField
      ref={ref}
      styledTheme={styledTheme}
      {...props}
    />
  );

});

export default TextInput;
