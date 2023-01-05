import { Menu, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';

export const CustomMenu = styled(Menu)`
  & .MuiMenu-paper {
    background: rgba(70, 57, 63, 0.98);
    background: linear-gradient(180deg, rgba(70, 57, 63, 0.98) 50%, rgba(48,46,57,1) 100%);
    margin-top: 1rem;
  };
`;

export const CustomMenuItem = styled(MenuItem)`
  font-size: var(--secondary-font-size);
  font-family: 'Dosis', sans-serif;
  color: #fff;
  font-weight: 500;
`;
