import { CgCloseO } from 'react-icons/cg';
import styled, { css } from 'styled-components';

import { commonBackground, commonShadow } from '@/styles';

export const quantitySelectorCustomStyles = css`
  grid-area: cs;
  margin: 0 auto;

  @media screen and (min-width: 768px) {
    margin: 0 auto 0 0;
  };
`;

export const Container = styled.div`
  ${commonBackground}
  ${commonShadow}
  padding: 10px;
  display: grid;
  gap: 10px;
  grid-template-columns: 30% 1fr min-content;
  grid-template-rows: repeat(min-content) auto;
  grid-template-areas: 
    'img title      deleteButton'
    'img totalPrice totalPrice'
    'cs  cs         cs'
  ;

  @media screen and (min-width: 768px) {
    padding: 20px;
    grid-column-gap: 20px;
    grid-auto-rows: auto;
    grid-template-areas: 
      'img title      deleteButton'
      'img totalPrice totalPrice'
      'img  cs         cs'
    ;
  };

  @media screen and (min-width: 1024px) {
    grid-template-columns: 15% 1fr min-content;
  };
`;

export const Title = styled.h3`
  grid-area: title;
  margin: 0;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-decoration: underline;
  cursor: pointer;
  font-size: var(--primary-font-size);
  color: ${({ theme }) => theme.text.white};
`;

export const ImageWrapper = styled.div`
  position: relative;
  grid-area: img;
  aspect-ratio: 1/1;
`;

export const Price = styled.h3`
  margin: 0;
  grid-area: totalPrice;
  font-size: var(--primary-font-size);
  color: ${({ theme }) => theme.text.harvest_gold};
`;

export const DeleteButton = styled(CgCloseO)`
  cursor: pointer;
  grid-area: deleteButton;
  font-size: var(--primary-font-size);
  color: ${({ theme }) => theme.text.white};
`;
