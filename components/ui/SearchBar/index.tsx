import { FC, KeyboardEvent } from 'react';

import * as S from './styles';
import { ISearchBarProps } from './types';

const SearchBar: FC<ISearchBarProps> = ({ value, onChange, onSubmit }) => {

  const detectKey = (e: KeyboardEvent<HTMLInputElement>): void => {

    const { code } = e;
    if (code === 'Enter') onSubmit();

  };

  return (
    <S.Container>
      <S.Input
        onChange={(e) => onChange(e)}
        value={value}
        onKeyDown={detectKey}
      />
      <S.SearchIcon onClick={onSubmit} />
    </S.Container>
  );

};

export default SearchBar;
