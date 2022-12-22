import { FiMenu } from 'react-icons/fi';
import styled from 'styled-components';

export const Container = styled.nav`
  width: 100%;
  box-sizing: border-box;
  grid-template-columns: min-content 1fr min-content;
  display: grid;
  grid-template-columns: 40px 1fr 40px;
  grid-template-areas: 'brand searchBar menu';
  padding: 10px 0;
  margin-bottom: 20px;
  grid-column-gap: 10px;
  justify-items: center;

  @media screen and (min-width: 768px) {
    grid-column-gap: 80px;
  };

  @media screen and (min-width: 1024px) {
    grid-column-gap: 0;
  };
`;

export const Icon = styled.img`
  height: 120px;
  grid-area: icon;
`;

export const MenuIcon = styled(FiMenu)`
  color: ${({ theme }) => theme.icon.white};
  font-size: 4rem;
  grid-area: menu;
`;
