import { Tab } from '@mui/material';
import { styled as muiStyled } from '@mui/material/styles';
import styled, { css } from 'styled-components';

import { commonBackground } from 'styles/commonStyles';

import { ICustomMuiComponentProps } from './types';

export const customButtonProps = css`
  @media screen and (min-width: 768px) {
    width: 60%;
    margin: 0 auto;
  };

  @media screen and (min-width: 1024px) {
    width: 40%;
  };
`;

export const Container = styled.div`
  ${commonBackground};
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media screen and (min-width: 768px) {
    padding: 35px;
  };

  @media screen and (min-width: 1024px) {
    padding: 40px;
  };
`;

export const Title = styled.h1`
  margin: 0;
  font-weight: 600;
  font-size: var(--primary-font-size);
  color: ${({ theme }) => theme.text.white};
`;

export const Description = styled.p`
  font-weight: 500;
  font-size: var(--secondary-font-size);
  color: ${({ theme }) => theme.text.white};
`;

export const Separator = styled.div`
  width: 100%;
  border-bottom: ${({ theme }) => `2px solid ${theme.border.white}`};
`;

//* MUI
export const CustomTab = muiStyled(Tab)<ICustomMuiComponentProps>(({ styledTheme }) => ({
  '&.MuiTab-root': {
    color:      styledTheme.text.white,
    fontFamily: "'Dosis', sans-serif",
    fontSize:   'var(--secondary-font-size)',
    fontWeight: 500
  },
  '&.Mui-selected': {
    color: styledTheme.text.light_orange
  }
}));
