import { SwiperProps } from 'swiper/react';

import { ICardProduct } from '@/interfaces';
import { CustomStyles } from '@/types';

export interface IProductSliderProps {
  title:      string;
  generalId?:  string;
  products: ICardProduct[];
  swiperProps?: SwiperProps;
  customStyles?: CustomStyles;
};

export interface ContainerProps {
  customStyles?: CustomStyles;
};
