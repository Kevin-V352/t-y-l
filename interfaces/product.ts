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
  id:             string;
  description:    string;
  discount_rate:  number;
  stock:          number;
};

export interface ICartProduct {
  id:       string;
  img:      IProductImage[];
  title:    string;
  quantity: number;
  price:    number;
  slug:     string;
  stock:    number;
};

export interface IPDFProduct {
  title: string;
  price: number;
};

export interface IPDFProductFromDB extends IPDFProduct {
  categories: string[];
};
