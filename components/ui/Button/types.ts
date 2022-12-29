import { ReactNode, ButtonHTMLAttributes } from 'react';

import { CustomStyles } from '@/types';

export interface IButtonWrapperProps {
  variant: 'primary' | 'outlined';
  fluid?: boolean;
  gridArea?: string;
  customStyles?: CustomStyles;
};

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, IButtonWrapperProps {
  text: string;
  icon?: ReactNode;
};
