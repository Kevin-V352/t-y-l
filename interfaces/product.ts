export interface ICardProduct {
  img:    IProductImage[];
  title:  string;
  price:  number;
  slug:   string;
};

export interface IProductImage {
  url: string;
};
