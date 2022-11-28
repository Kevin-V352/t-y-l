import { BsFilter } from 'react-icons/bs';
import styled from 'styled-components';

import { commonBackground } from '@/styles';

export const Container = styled.div`
  ${commonBackground}
  display: flex;
  flex-direction: column;
  padding: 35px;
`;

export const OptionsWrapper = styled.div`
  display: flex;
  width: 100%;
`;

export const ProductList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 35px;
  margin-top: 35px;
`;

export const FilterIcon = styled(BsFilter)`
  color: ${({ theme }) => theme.icon.white};
  font-size: 5rem;
`;
