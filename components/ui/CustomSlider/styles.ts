import styled, { css } from 'styled-components';

import { commonBorder } from '@/styles';

import { ContainerProps, SlideContainerProps } from './types';

const selectorStyles = css`
  content: '';
  width: 100%;
  background-color: #FCBA43;
  position: absolute;
  top: 0;
  z-index: 2;
`;

export const chipCustomStyles = css`
  position: absolute;
  left: 0;
  bottom: 12%;
  max-width: 50%;
`;

export const Container = styled.div<ContainerProps>`
  width: 100%;
  display: flex;
  height: 350px;
  ${({ mode }) => (mode === 1) && commonBorder}

  @media screen and (min-width: 1920px) {
    height: 400px;
  };
`;

export const SlideContainer = styled.div<SlideContainerProps>`
  height: 100%;
  overflow: hidden;
  position: relative;
  line-height: 0;
  transition: ease 500ms;
  cursor: pointer;
  ${({ mode, $active }) => (
    (mode === 1)
      ? (`
        flex: ${$active ? '30%' : '1'};
        :last-child {
          margin: 0;
        }
      `)
      : (`
        display: flex;
        justify-content: space-around;
        ::before {
          ${selectorStyles}
          height: 0;
        }
        :hover {
          ::before {
            ${selectorStyles}
            height: 3px;
          }
        }
      `)
  )
}
`;

export const SlideImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  z-index: 1;
`;
