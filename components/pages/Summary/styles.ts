import styled from 'styled-components';

import { commonBackground, commonShadow } from '@/styles';

import { ISummaryTextItemProps } from './types';

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
    display: grid;
    grid-template-areas: 
      'title    title'
      'products summary'
    ;
    grid-template-columns: 1fr 30%;
    grid-auto-rows: min-content;
  };
`;

export const Title = styled.h1`
  margin: 0;
  font-weight: 600;
  grid-area: title;
  font-size: var(--primary-font-size);
  color: ${({ theme }) => theme.text.white};
`;

export const DataList = styled.ul`
  padding-left: 0;
  grid-area: summary;

  @media screen and (min-width: 1024px) {
    ${commonBackground}
    ${commonShadow}
    margin: 0;
    padding: 40px;
    height: min-content;
  };
`;

export const ProductList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Item = styled.li`
  color: ${({ theme }) => theme.text.white};
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 5px;

  @media screen and (min-width: 1024px) {
    :last-of-type {
      margin-bottom: 40px;
    };
  };
`;

export const TextItem = styled.span<ISummaryTextItemProps>`
  font-size: var(--secondary-font-size);
  ${({ theme: { text }, variant }) => (
    (variant === 'primary')
      ? (`
        color: ${text.harvest_gold};
        font-weight: 600;
        white-space: nowrap;
      `)
      : (`
        color: ${text.white};
        font-weight: 500;
      `)
    )
  }
`;
