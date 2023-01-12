import { Checkbox, FormControlLabel } from '@mui/material';
import { styled as muiStyled } from '@mui/material/styles';

import { ICustomMuiComponentProps } from './types';

export const CustomCheckbox = muiStyled(Checkbox)<ICustomMuiComponentProps>(({ styledTheme }) => ({
  '&.MuiCheckbox-root': {
    color: styledTheme.border.white
  },
  '&.Mui-checked': {
    color: styledTheme.border.light_orange
  },
  '& .MuiSvgIcon-root': {
    fontSize: 26
  }
}));

export const CustomFormControlLabel = muiStyled(FormControlLabel)<ICustomMuiComponentProps>(({ styledTheme }) => ({
  '& .MuiFormControlLabel-label': {
    color:      styledTheme.text.white,
    fontFamily: "'Dosis', sans-serif",
    fontSize:   'var(--secondary-font-size)',
    fontWeight: 500
  }
}));
