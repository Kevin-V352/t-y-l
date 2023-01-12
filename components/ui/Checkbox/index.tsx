import { FC } from 'react';

import { FormControl } from '@mui/material';
import { useTheme } from 'styled-components';

import * as S from './styles';
import { ICheckboxProps } from './types';

const FormLabel: FC<ICheckboxProps> = ({ label, defaultChecked, onChange }) => {

  const styledTheme = useTheme();

  return (
    <FormControl>
      <S.CustomFormControlLabel
        label={label}
        onChange={onChange}
        styledTheme={styledTheme}
        control={<S.CustomCheckbox styledTheme={styledTheme} defaultChecked={defaultChecked}/>}
      />
    </FormControl>
  );

};

export default FormLabel;
