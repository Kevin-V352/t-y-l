export interface ICardProduct {
  img:    IProductImage[];
  title:  string;
  price:  number;
  slug:   string;
};

export interface IProductImage {
  url: string;
};

export interface IProductDetails extends ICardProduct {
  id: string;
  description: string;
  discount_rate: number;
  stock: number;
};
