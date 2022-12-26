import { ReactNode, ButtonHTMLAttributes } from 'react';

export interface IButtonWrapperProps {
  variant: 'primary' | 'outlined';
  fluid?: boolean;
  gridArea?: string;
};

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, IButtonWrapperProps {
  text: string;
  icon?: ReactNode;
};
