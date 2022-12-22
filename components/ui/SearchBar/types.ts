import { ChangeEvent } from 'react';

export interface ISearchBarProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
};
