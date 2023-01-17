import styled from 'styled-components';

import { ChipContentProps } from './types';

export const ChipContainer = styled.div<ChipContentProps>`
  font-weight: bold;
  display: flex;
  align-items: center;
  padding: 5px 10px;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  background-color: ${({ theme }) => theme.background.saffron_mango};
  border: ${({ theme }) => `${theme.border.pastel_orange} 1.5px solid`};
  ${({ customStyles }) => customStyles};
`;

export const ChipText = styled.span`
  color: white;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  line-height: normal;
  font-size: var(--secondary-font-size);
`;
