import { FC } from 'react';

import { FormControl } from '@mui/material';
import { useTheme } from 'styled-components';

import * as S from './styles';
import { ICheckboxProps } from './types';

const FormLabel: FC<ICheckboxProps> = (props) => {

  const styledTheme = useTheme();

  return (
    <FormControl>
      <S.CustomFormControlLabel
        {...props}
        styledTheme={styledTheme}
        control={<S.CustomCheckbox styledTheme={styledTheme} />}
      />
    </FormControl>
  );

};

export default FormLabel;
