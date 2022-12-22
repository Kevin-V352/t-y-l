import { ReactNode } from 'react';

export interface IOptionListProps {
  text: string;
  onClick?: () => void;
  icon?: ReactNode;
  paddingLeft?: number;
};
