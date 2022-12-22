import { ICardProduct, IProductDetails } from '@/interfaces';

export interface ISearchPageProps {
  products: ICardProduct[];
};

export interface IProductDetailsPageProps {
  product: IProductDetails;
};
