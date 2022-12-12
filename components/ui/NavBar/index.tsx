/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { ChangeEvent, FC, useState } from 'react';

import { useRouter } from 'next/router';

import { MainSidebar, SearchBar } from '@/ui';

import * as S from './styles';

const NavBar: FC = () => {

  const [query, setQuery] = useState<string>('');
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const router = useRouter();

  const handlerChange = (e: ChangeEvent<HTMLInputElement>): void => {

    const { value } = e.target;
    setQuery(value);

  };

  const handlerSubmit = (): void => {

    if (query.trim() === '') {

      alert('Valor de entrada invalido');
      return;

    };
    setQuery('');

    router.push(`/search/${query}`);

  };

  return (
    <S.Container>
      <SearchBar
        value={query}
        onChange={handlerChange}
        onSubmit={handlerSubmit}
      />
      <S.MenuIcon onClick={() => setOpenMenu(true)}/>
      <MainSidebar
        open={openMenu}
        onClose={() => setOpenMenu(false)}
      />
    </S.Container>
  );

};

export default NavBar;
