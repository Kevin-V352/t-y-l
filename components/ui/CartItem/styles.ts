import { CgCloseO } from 'react-icons/cg';
import styled, { css } from 'styled-components';

import { commonBackground } from 'styles/commonStyles';

export const quantitySelectorCustomStyles = css`
  grid-area: cs;
  margin: 0 auto;
`;

export const Container = styled.div`
  ${commonBackground}
  box-shadow: ${({ theme }) => `${theme.border.transparent_black} 0px 2px 15px 2px`};
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
`;

export const Title = styled.h3`
  grid-area: title;
  margin: 0;
  font-size: var(--primary-font-size);
  color: ${({ theme }) => theme.text.white};
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
