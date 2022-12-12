import { ListItemText } from '@mui/material';
import { styled as muiStyled } from '@mui/material/styles';
import styled from 'styled-components';

export const CustomListItemText = muiStyled(ListItemText)`
  font-size: 20px;

  .MuiListItemText-primary {
    font-size: var(--secondary-font-size);
    font-family: 'Dosis', sans-serif;
    font-weight: 500;
    color: #FFF;
  };
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;
