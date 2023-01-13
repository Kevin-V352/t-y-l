export interface IOrderMin {
  id:   string;
  paid: boolean;
};

export interface IFullOrder {
  operation: string;
  data:      Data;
};

export interface Data {
  __typename:    string;
  address:       string;
  city:          string;
  createdAt:     Date;
  createdBy:     EdBy;
  id:            string;
  localizations: Localization[];
  paid:          boolean;
  phoneNumber:   string;
  products:      ProductMin[];
  publishedAt:   Date;
  publishedBy:   EdBy;
  scheduledIn:   any[];
  stage:         string;
  totalPrice:    number;
  updatedAt:     Date;
  updatedBy:     EdBy;
};

interface EdBy {
  __typename: string;
  id:         string;
};

export interface Localization {
  deliveryMethod: string;
  locale:         string;
  name:           string;
  paymentMethod:  string;
};

export interface ProductMin {
  id:       string;
  price:    number;
  quantity: number;
  title:    string;
};
