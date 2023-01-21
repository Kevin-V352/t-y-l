import styled, { css, DefaultTheme, FlattenInterpolation, ThemeProps } from 'styled-components';

import { IButtonWrapperProps } from './types';

const boxShadow = css`
  box-shadow: ${({ theme }) => `${theme.border.transparent_black} 0px 2px 15px 2px`};
`;

const commonDisabledStyles = css`
  cursor: default;
`;

const selectVariant = (variant: 'primary' | 'outlined'): FlattenInterpolation<ThemeProps<DefaultTheme>> => {

  switch (variant) {

    case 'primary':
      return css`
        background: ${({ theme }) => theme.button.mocha};
        background: ${({ theme: { button } }) => `linear-gradient(180deg, ${button.mocha} 50%, ${button.ferra} 100%)`};
        border: ${({ theme }) => `${theme.button.cocoa} solid 2px`};
        ${boxShadow}

        :hover {
          box-shadow: ${({ theme }) => `${theme.border.transparent_black} 0px 2px 15px 2px`};
          text-shadow: ${({ theme }) => `0 0 7px ${theme.border.transparent_black}`};
        };

        :disabled {
          text-shadow: none;
          background: ${({ theme }) => theme.button.oslo_grey};
          background: ${({ theme }) => `linear-gradient(180deg, ${theme.button.oslo_grey} 50%, ${theme.button.transparent_white} 100%)`};
          border-color: ${({ theme }) => theme.button.oslo_grey};
          ${commonDisabledStyles};
        }
      `;

    case 'outlined':
      return css`
        background: transparent;
        border: ${({ theme }) => theme.border.light_grey} solid 2px;

        :disabled {
          color: ${({ theme }) => theme.text.oslo_grey};
          border-color: ${({ theme }) => theme.button.oslo_grey};
          ${commonDisabledStyles}
        }
      `;

  };

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
  grid-area: ${({ gridArea }) => gridArea};
  width: ${({ fluid = false }) => fluid ? '100%' : 'auto'};
  ${({ variant }) => selectVariant(variant)}
  ${({ customStyles }) => customStyles}
`;
