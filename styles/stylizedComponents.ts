import styled from 'styled-components';

export const OutlineButton = styled.button`
  background: transparent;
  border: ${({ theme }) => theme.border.light_grey} solid 2px;
  border-radius: 5px;
  color: #E4D9D5;
  font-weight: 500;
  padding: 10px 30px;
  text-transform: uppercase;
  font-weight: bold;
  font-size: var(--secondary-font-size);
  cursor: pointer;
`;
