import { BsFilter } from 'react-icons/bs';
import styled from 'styled-components';

import { commonBackground } from '@/styles';

export const Container = styled.div`
  ${commonBackground}
  display: flex;
  flex-direction: column;
  padding: 35px;
  flex: 1;
`;

export const OptionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media screen and (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 35px;
  };
`;

export const ProductList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 35px;
  margin-top: 35px;

  @media screen and (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  };
`;

export const FilterIcon = styled(BsFilter)`
  color: ${({ theme }) => theme.icon.white};
  font-size: 5rem;
`;

export const NotResultsText = styled.span`
  margin: auto;
  font-size: var(--primary-font-size);
  color: ${({ theme }) => theme.text.light_grey}
`;
