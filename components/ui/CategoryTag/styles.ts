import { IoStarOutline } from 'react-icons/io5';
import styled from 'styled-components';

import { WrapperProps } from './types';

export const Wrapper = styled.div<WrapperProps>`
  position: relative;
  display: flex;
  align-items: center;
  gap: 22px;
  width: min-content;
  padding: 8px;
  border-radius: 30px;
  border: ${({ theme }) => `${theme.border.transparent_white} 2px solid`};
  box-shadow: ${({ theme }) => `${theme.border.transparent_black} 0px 2px 8px`};
  ::before {
    content: '';
    box-shadow: ${({ theme }) => `${theme.border.transparent_black} inset 0px 1px 2px`};
    width: 100%;
    height: 100%;
    position: absolute;
    border-radius: 30px;
    left: 0;
  }
  ${({ customStyles }) => customStyles}
`;

export const Content = styled.div`
  width: 100%;
  height: 100%;
`;

export const StarIcon = styled(IoStarOutline)`
  font-size: 1.8rem;
  border-radius: 50%;
  padding: 6px;
  border: ${({ theme }) => `${theme.text.light_grey} 2px solid`};
  color: ${({ theme }) => theme.text.light_grey};
`;

export const Title = styled.span`
  font-weight: 600;
  text-transform: uppercase;
  font-size: var(--secondary-font-size);
  color: ${({ theme }) => theme.text.light_grey};
`;
