import { Checkbox, FormControlLabel, FormHelperText, FormLabel, Radio } from '@mui/material';
import { styled as muiStyled } from '@mui/material/styles';
import styled from 'styled-components';

import { commonBackground } from '@/styles';

import { ICustomFormControlLabelProps } from './types';

const commonSvgSize = 26;

export const Container = styled.div`
  ${commonBackground}
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media screen and (min-width: 768px) {
    padding: 35px;
  };

  @media screen and (min-width: 1024px) {
    padding: 40px;
  };
`;

export const LoadContainer = styled.div`
  ${commonBackground}
  display: flex;
  flex: 1;
`;

export const Title = styled.h1`
  margin: 0;
  font-weight: 600;
  grid-area: title;
  font-size: var(--primary-font-size);
  color: ${({ theme }) => theme.text.white};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media screen and (min-width: 1024px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas: 
      'title         title'
      'paymentMethod deliveryMethod'
      'name          cel'
      'city          address'
      'btn           btn'
    ;
  };
`;

export const Label = styled.label`
  font-size: var(--secondary-font-size);
  font-weight: 600;
  color: ${({ theme }) => theme.text.white};
`;

export const Separator = styled.div`
  width: 100%;
  border-bottom: ${({ theme }) => `2px solid ${theme.border.white}`};

  @media screen and (min-width: 1024px) {
    display: none;
  };
`;

export const ButtonWrapper = styled.div`
  @media screen and (min-width: 1024px) {
    grid-area: btn;
    width: 40%;
    justify-self: center;
  };
`;

// ? NOTA: PARECE QUE A VECES TE PUEDE TOMAR LA CLASE CON O SIN ESPACIO ENTRE "&" Y EL RESTO, REFIRIENDONOS AL SELECTOR DE CLADE DE MUI

export const CustomFormControlLabel = muiStyled(FormControlLabel)<ICustomFormControlLabelProps>(({ styledTheme }) => ({
  '& .MuiFormControlLabel-label': {
    color:      styledTheme.text.white,
    fontFamily: "'Dosis', sans-serif",
    fontSize:   'var(--secondary-font-size)',
    fontWeight: 500
  }
}));

export const CustomRadio = muiStyled(Radio)<ICustomFormControlLabelProps>(({ styledTheme }) => ({
  color: styledTheme.border.white,

  '&.Mui-checked': {
    color: styledTheme.border.light_orange
  },
  '& .MuiSvgIcon-root': {
    fontSize: commonSvgSize
  }

}));

export const CustomCheckbox = muiStyled(Checkbox)<ICustomFormControlLabelProps>(({ styledTheme }) => ({
  '&.MuiCheckbox-root': {
    color: styledTheme.border.white
  },
  '&.Mui-checked': {
    color: styledTheme.border.light_orange
  },
  '& .MuiSvgIcon-root': {
    fontSize: commonSvgSize
  }
}));

export const CustomFormLabel = muiStyled(FormLabel)<ICustomFormControlLabelProps>(({ styledTheme }) => ({
  '&.MuiFormLabel-root': {
    color:      styledTheme.text.white,
    fontFamily: "'Dosis', sans-serif",
    fontSize:   'var(--secondary-font-size)',
    fontWeight: 600
  },
  '&.Mui-error': {
    color: styledTheme.border.error
  }
}));

export const CustomFormHelperText = muiStyled(FormHelperText)<ICustomFormControlLabelProps>(({ styledTheme }) => ({
  '&.Mui-error': {
    // color:      styledTheme.text.error,
    fontSize:   'var(--secondary-font-size)',
    fontFamily: "'Dosis', sans-serif",
    fontWeight: 500
  }
}));
