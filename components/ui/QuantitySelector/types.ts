export interface IQuantitySelectorProps {
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
