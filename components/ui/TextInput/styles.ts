import { TextField } from '@mui/material';
import { styled as muiStyled } from '@mui/material/styles';

import { ICustomTextFieldProps } from './types';

const commonTextStyles = {
  fontSize:   'var(--secondary-font-size)',
  fontFamily: "'Dosis', sans-serif",
  fontWeight: 500
};

// TODO: BUG CON LOS COLORES DE ERROR

export const CustomTextField = muiStyled(TextField)<ICustomTextFieldProps>(({ styledTheme }) => ({
  '& label': {
    ...commonTextStyles,
    color: styledTheme.text.white
  },
  '& label.Mui-focused': {
    color: styledTheme.text.white
  },
  '& .Mui-error': {
    // color: styledTheme.text.error,

    '& .MuiOutlinedInput-notchedOutline': {
      // borderColor: styledTheme.border.error
    }
  },
  '& .MuiFormHelperText-root': {
    ...commonTextStyles
    // color: styledTheme.text.error
  },
  '& .MuiOutlinedInput-root': {
    ...commonTextStyles,
    color: styledTheme.text.white,

    '& fieldset': {
      borderColor: styledTheme.border.white
    },
    '&:hover fieldset': {
      borderColor: styledTheme.border.white
    },
    '&.Mui-focused fieldset': {
      borderColor: styledTheme.border.white
    },
    '& :-webkit-autofill': {
      '-webkit-box-shadow':      `0 0 0 100px ${styledTheme.background.outer_space} inset`,
      '-webkit-text-fill-color': styledTheme.text.white
    }
  }
}));
