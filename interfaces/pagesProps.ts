import { IHomeContentResponse, IOrderMin, IProductDetails } from '@/interfaces';

export interface IProductDetailsPageProps {
  product: IProductDetails;
};

export interface IOpenChatPageProps {
  order: IOrderMin;
};

export interface IHomePageProps {
  content: IHomeContentResponse;
};
