import { CircularProgress } from '@mui/material';
import { styled as muiStyled } from '@mui/material/styles';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export const CustomLoader = muiStyled(CircularProgress)`
  .MuiCircularProgress-circle {
    color: #FCBA43;
  }
`;
