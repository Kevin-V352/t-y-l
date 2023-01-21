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

export interface IProductStockResponse {
  id: string;
  stock: number;
};

export interface IProductPriceAndStockResponse {
  price: number;
  stock: number;
};

export interface IPaginatedProducts {
  pageInfo: IPageInfo;
  products: ICardProduct[];
};

export interface IPaginatedProductsResponse {
  pageInfo: IPageInfo;
  edges: Edge[];
};

interface IPageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

interface Edge {
  node: ICardProduct;
};
