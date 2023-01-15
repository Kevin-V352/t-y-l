import { CustomStyles } from '@/types';

export interface IQuantitySelectorContainer {
  customStyles?: CustomStyles;
  $loading?: boolean;
};

export interface IQuantitySelectorContentProps {
  maxQuantity: number;
  initialValue?: number;
  onChange?: (quantity: number) => void;
};

export interface IQuantitySelectorProps extends IQuantitySelectorContainer, IQuantitySelectorContentProps {};

export interface IButtonProps {
  disabled: boolean;
};
