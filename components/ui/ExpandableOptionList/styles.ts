import { SlArrowDown, SlArrowUp } from 'react-icons/sl';
import styled from 'styled-components';

export const OptionWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const IconWrapper = styled.button`
  background: none;
  border: none;
`;

export const ArrowDown = styled(SlArrowDown)`
  font-size: var(--secondary-font-size);
  color: ${({ theme }) => theme.icon.white};
`;

export const ArrowUp = styled(SlArrowUp)`
  font-size: var(--secondary-font-size);
  color: ${({ theme }) => theme.icon.white};
`;
