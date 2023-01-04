export type ClientFormType = 'withdrawal_by_local' | 'home_delivery' | string;

export interface ClientFormData {
  paymentMethod:  string;
  deliveryMethod: ClientFormType;
  name:           string;
  phoneNumber:    string;
  city?:          string;
  address?:       string;
};
