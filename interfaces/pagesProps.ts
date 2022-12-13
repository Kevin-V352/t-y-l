import { ICardProduct, ICartProductResponse, IProductDetails } from '@/interfaces';

export interface ISearchPageProps {
  products: ICardProduct[];
};

export interface IProductDetailsPageProps {
  product: IProductDetails;
};

export interface ICartPageProps {
  products: ICartProductResponse[];
};
