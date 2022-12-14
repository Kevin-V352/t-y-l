import { CircularProgress } from '@mui/material';
import { styled as muiStyled } from '@mui/material/styles';
import styled from 'styled-components';

import { commonBackground } from 'styles/commonStyles';

export const Container = styled.div`
  ${commonBackground}
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Title = styled.h1`
  font-size: var(--primary-font-size);
  color: ${({ theme }) => theme.text.white};
  margin: 0;
  font-weight: 500;
`;

export const LoaderWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 30px;
`;

export const CustomLoader = muiStyled(CircularProgress)`
  .MuiCircularProgress-circle {
    color: #FCBA43;
  }
`;

export const EmptyTitle = styled.h3`
  font-weight: 500;
  font-size: var(--primary-font-size);
  color: ${({ theme }) => theme.text.white};
`;

export const HighlightedText = styled.p`
  text-align: center;
  margin: 0;
  font-size: var(--secondary-font-size);
  color: ${({ theme }) => theme.text.harvest_gold};
`;
