import { CircularProgress } from '@mui/material';
import { styled as muiStyled } from '@mui/material/styles';
import styled from 'styled-components';

import { commonBackground, commonShadow } from '@/styles';

import { ICartContainerProps } from './types';

export const Container = styled.div<ICartContainerProps>`
  ${commonBackground}
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  ${({ status }) => (status === 'products') && 'margin-bottom: 132px;'}

  @media screen and (min-width: 768px) {
    padding: 35px;
  };

  @media screen and (min-width: 1024px) {
    display: ${({ status }) => (status !== 'products') ? 'flex' : 'grid'};
    grid-template-areas: 
      'title    title'
      'products summary'
    ;
    grid-template-rows: min-content auto;
    grid-template-columns: 1fr 30%;
    grid-column-gap: 40px;
    padding: 40px;
    margin-bottom: 0;
  };
`;

export const Title = styled.h1`
  margin: 0;
  font-weight: 600;
  grid-area: title;
  font-size: var(--primary-font-size);
  color: ${({ theme }) => theme.text.white};
`;

export const ProductList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
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

export const SummaryWrapper = styled.div`
  ${commonBackground}
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 20px 30px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media screen and (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    padding: 40px;
  };

  @media screen and (min-width: 1024px) {
    ${commonShadow}
    position: static;
    height: min-content;
    display: flex;
    flex-direction: column;
    gap: 40px;
  };
`;

export const SummaryTextWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const SummaryText = styled.span`
  margin-right: 20px;
  font-weight: 600;
  font-size: var(--primary-font-size);
  color: ${({ theme }) => theme.text.white};
`;

export const SummaryPrice = styled.span`
  font-weight: 600;
  font-size: var(--primary-font-size);
  color: ${({ theme }) => theme.text.harvest_gold};
`;
