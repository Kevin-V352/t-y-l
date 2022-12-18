import { CustomStyles } from '@/types';

export interface IQuantitySelectorContainer {
  customStyles?: CustomStyles;
  $loading?: boolean;
};

export interface IQuantitySelectorProps extends IQuantitySelectorContainer {
  quantity: number;
  maxQuantity: number;
  disableAdd?: boolean;
  disableRemove?: boolean;
  add: () => void;
  remove: () => void;
};

export interface IButtonProps {
  disabled: boolean;
};
