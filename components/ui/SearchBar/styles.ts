import { BiSearchAlt } from 'react-icons/bi';
import styled from 'styled-components';

export const Container = styled.div`
  height: min-content;
  display: grid;
  grid-template-columns: 1fr min-content;
  border: 2px solid rgba(199, 198, 201, 0.7);
  border-radius: 30px;
  padding: 0 10px;
  box-sizing: border-box;
  gap: 5px;
  background-color: rgba(0, 0, 0, 0.5);
  align-items: center;
  grid-area: searchBar;
  height: 40px;
  width: 100%;
  max-width: 600px;
  margin-left: 5px;

  @media screen and (min-width: 1024px) {
    margin-left: 0;
  };
`;

export const Input = styled.input`
  font-size: 1.8rem;
  background-color: transparent;
  width: 100%;
  border: none;
  color: white;
  :focus {
    outline: none;
  };

  //TODO: REVISAR BARRA EN 1080p
  @media screen and (min-width: 1920px) {
    font-size: var(--secondary-font-size);
  };
`;

export const SearchIcon = styled(BiSearchAlt)`
  font-size: 2rem;
  color: rgba(199, 198, 201, 0.7);
`;
