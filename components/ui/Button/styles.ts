import styled, { css, DefaultTheme, FlattenInterpolation, ThemeProps } from 'styled-components';

import { IButtonWrapperProps } from './types';

const boxShadow = css`
  box-shadow: ${({ theme }) => `${theme.border.transparent_black} 0px 2px 15px 2px`};
`;

const selectVariant = (variant: 'primary' | 'outlined'): FlattenInterpolation<ThemeProps<DefaultTheme>> => {

  switch (variant) {

    case 'primary':
      return css`
        background: rgb(167,110,80);
        background: linear-gradient(180deg, rgba(167,110,80,1) 50%, rgba(109,78,71,1) 100%);
        border: #92614E solid 2px;
        ${boxShadow}

        :hover {
          box-shadow: ${({ theme }) => `${theme.border.transparent_black} 0px 2px 15px 2px`};
          text-shadow: ${({ theme }) => `0 0 7px ${theme.border.transparent_black}`};
        };
      `;

    case 'outlined':
      return css`
        background: transparent;
        border: ${({ theme }) => theme.border.light_grey} solid 2px;
      `;

  }

};

export const Wrapper = styled.button<IButtonWrapperProps>`
  border-radius: 5px;
  color: #E4D9D5;
  font-weight: 500;
  padding: 10px 30px;
  text-transform: uppercase;
  font-weight: bold;
  font-size: var(--secondary-font-size);
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 5px;
  user-select: none;
  width: ${({ fluid = false }) => fluid ? '100%' : 'auto'};
  ${({ variant }) => selectVariant(variant)}
`;
