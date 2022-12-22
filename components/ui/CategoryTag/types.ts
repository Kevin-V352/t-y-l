import { CustomStyles } from '@/types';

export interface Props {
  id?: string;
  title: string;
  customStyles?: CustomStyles;
};

export interface WrapperProps {
  customStyles?: CustomStyles;
};
