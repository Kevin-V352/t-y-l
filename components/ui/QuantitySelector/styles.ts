import { CgAdd, CgRemove } from 'react-icons/cg';
import styled, { css } from 'styled-components';

import { IButtonProps, IQuantitySelectorContainer } from './types';

const commonButtonStyles = css<IButtonProps>`
  cursor: pointer;
  font-size: var(--primary-font-size);
  color: ${({ theme, disabled }) => disabled ? theme.text.oslo_grey : theme.text.white};
`;

export const Container = styled.div<IQuantitySelectorContainer>`
  ${({ $loading: loading }) => !loading && (`
    display: grid;
    grid-template-columns: min-content 1fr min-content;
    gap: 20px;
    align-items: center;
    justify-items: center;
    grid-template-areas: 
      'quantityAvailable quantityAvailable quantityAvailable'
      'removeButton      quantity          addButton'
    ;
  `)}

  ${({ customStyles }) => customStyles};
`;

export const TotalQuantity = styled.span`
  grid-area: quantityAvailable;
  font-weight: 500;
  font-size: var(--secondary-font-size);
  color: ${({ theme }) => theme.text.harvest_gold};
`;

export const Quantity = styled.span`
  grid-area: quantity;
  font-size: var(--primary-font-size);
  color: ${({ theme }) => theme.text.harvest_gold};
  font-weight: 500;
  user-select: none;
`;

export const RemoveButton = styled(CgRemove)`
  ${commonButtonStyles}
  grid-area: removeButton;
`;

export const AddButton = styled(CgAdd)<IButtonProps>`
  ${commonButtonStyles}
  grid-area: addButton;
`;
