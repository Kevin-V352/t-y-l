import { TfiClose } from 'react-icons/tfi';
import styled from 'styled-components';

import { commonBackground } from '@/styles';

import { SideBarContainerProps } from './types';

export const BaseSidebar = styled.div<SideBarContainerProps>`
  ${commonBackground}
  width: 100vw;
  height: 100vh;
  position: fixed;
  transition: ease .2s;
  top: 0;
  box-sizing: border-box;
  padding: 20px 20px 0 20px;
  display: flex;
  flex-direction: column;
  right: ${({ open }) => open ? '0' : '-100vw'};
  overflow-y: scroll;
`;

export const CloseIcon = styled(TfiClose)`
  font-size: 2rem;
  color: ${({ theme }) => theme.icon.white};
  margin: 0 0 1.5rem auto;
`;
