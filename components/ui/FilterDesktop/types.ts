import { CustomStyles } from '@/types';

export interface IFilterDesktopProps {
  changeCategory: (category: string) => void;
  customStyles?: CustomStyles;
};

export interface IFilterDesktopContainerProps {
  customStyles?: CustomStyles;
};
