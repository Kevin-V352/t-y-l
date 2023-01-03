import { ICartProduct } from '@/interfaces';

export interface ICartItemContainerProps {
  editable?: boolean;
};

export interface ICartItemTitleProps {
  editable?: boolean;
};

export interface ICartItemProps extends ICartItemContainerProps {
  product: ICartProduct;
};
