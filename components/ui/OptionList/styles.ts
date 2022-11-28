import { ListItemText } from '@mui/material';
import { styled as muiStyled } from '@mui/material/styles';

export const CustomListItemText = muiStyled(ListItemText)`
  font-size: 20px;

  .MuiListItemText-primary {
    font-size: var(--secondary-font-size);
    font-family: 'Dosis', sans-serif;
    color: #FFF;
  };
`;
