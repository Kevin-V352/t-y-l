import { CustomStyles } from '@/types';

export interface IQuantitySelectorContainer {
  customStyles?: CustomStyles;
};

export interface IQuantitySelectorProps extends IQuantitySelectorContainer {
  loading?: boolean;
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
