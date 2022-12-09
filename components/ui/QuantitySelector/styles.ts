import { CgAdd, CgRemove } from 'react-icons/cg';
import styled, { css } from 'styled-components';

const commonButtonStyles = css`
  font-size: var(--primary-font-size);
  color: ${({ theme }) => theme.text.white};
`;

export const Container = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr min-content;
  gap: 20px;
  align-items: center;
  justify-items: center;
  grid-template-areas: 
    'quantityAvailable quantityAvailable quantityAvailable'
    'removeButton      quantity          addButton'
  ;
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
`;

export const RemoveButton = styled(CgRemove)`
  ${commonButtonStyles}
  grid-area: removeButton;
`;

export const AddButton = styled(CgAdd)`
  ${commonButtonStyles}
  grid-area: addButton;
`;
