import { FC } from 'react';

import { SearchBar } from '@/ui';

import * as S from './styles';

const NavBar: FC = () => (
  <S.Container>
    <SearchBar />
    <S.MenuIcon />
  </S.Container>
);

export default NavBar;
