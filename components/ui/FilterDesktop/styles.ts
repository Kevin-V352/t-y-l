import styled from 'styled-components';

import { commonBackground } from '@/styles';

import { IFilterDesktopContainerProps } from './types';

export const Container = styled.div<IFilterDesktopContainerProps>`
  ${commonBackground}
  height: min-content;
  padding: 15px;
  box-shadow: ${({ theme }) => `${theme.border.transparent_black} 0px 2px 15px 2px`};
  ${({ customStyles }) => customStyles}
`;

export const Title = styled.h3`
  color: ${({ theme }) => theme.text.harvest_gold};
  font-size: var(--primary-font-size);
  font-weight: 500;
  margin: 0 0 20px 0;
`;
