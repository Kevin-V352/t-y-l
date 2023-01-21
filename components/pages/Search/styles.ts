import { BsFilter } from 'react-icons/bs';
import { CgArrowLeftO, CgArrowRightO } from 'react-icons/cg';
import styled, { css } from 'styled-components';

import { commonBackground } from '@/styles';

import { IButtonProps } from './types';

const commonButtonStyles = css<IButtonProps>`
  cursor: pointer;
  font-size: var(--primary-font-size);
  color: ${({ theme, disabled }) => disabled ? theme.text.oslo_grey : theme.text.white};
`;

export const customStylesFilterDesktop = css`
  grid-area: filters;
`;

export const Container = styled.div`
  ${commonBackground}
  display: flex;
  flex-direction: column;
  padding: 35px;
  flex: 1;
  gap: 35px;

  @media screen and (min-width: 1024px) {
    display: grid;
    grid-template-columns: 20vw 1fr;
    grid-template-rows: min-content 1fr;
    gap: 30px;
    grid-template-areas: 
      'filters      buttons'
      'filters      products'
      'pageSelector pageSelector'
    ;
  };
`;

export const OptionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  grid-area: buttons;

  @media screen and (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 35px;
  };

  @media screen and (min-width: 1024px) {
    display: flex;
    flex-direction: row;
  };
`;

export const ProductList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 35px;
  grid-area: products;
  height: min-content;

  @media screen and (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  };

  @media screen and (min-width: 1024px) {
    margin-top: 0;
    grid-template-columns: repeat(3, 1fr);
  };

  @media screen and (min-width: 1920px) {
    grid-template-columns: repeat(4, 1fr);
  };
`;

export const FilterIcon = styled(BsFilter)`
  color: ${({ theme }) => theme.icon.white};
  font-size: 5rem;
`;

export const NotResultsText = styled.span`
  margin: auto;
  font-size: var(--primary-font-size);
  color: ${({ theme }) => theme.text.light_grey};
`;

export const PageSelectorWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 30px;
  grid-area: pageSelector;
`;

export const CurrentPage = styled.span`
  font-size: var(--primary-font-size);
  color: ${({ theme }) => theme.text.harvest_gold};
  font-weight: 600;
  user-select: none;
`;

export const BackButton = styled(CgArrowLeftO)`
  ${commonButtonStyles}
`;

export const FowardButton = styled(CgArrowRightO)`
  ${commonButtonStyles}
`;
