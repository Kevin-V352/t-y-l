import { CustomStyles } from '@/types';

export interface Props {
  title:      string;
  generalId?:  string;
  customStyles?: CustomStyles;
};

export interface ContainerProps {
  customStyles?: CustomStyles;
};
