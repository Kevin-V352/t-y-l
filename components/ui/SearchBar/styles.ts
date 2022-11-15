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
`;

export const Input = styled.input`
  font-size: 1.8rem;
  background-color: transparent;
  border: none;
  color: white;
  :focus {
    outline: none;
  };
`;

export const SearchIcon = styled(BiSearchAlt)`
  font-size: 2rem;
  color: rgba(199, 198, 201, 0.7);
`;
