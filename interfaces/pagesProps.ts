import { ICardProduct, IOrderMin, IProductDetails } from '@/interfaces';

export interface ISearchPageProps {
  products: ICardProduct[];
};

export interface IProductDetailsPageProps {
  product: IProductDetails;
};

export interface IOpenChatPageProps {
  order: IOrderMin;
};
