import { gql } from 'graphql-request';

export const CREATE_ORDER = gql`
  mutation createOrder(
    $name: String!,
    $phoneNumber: String!,
    $totalPrice: Float!,
    $paymentMethod: String!,
    $deliveryMethod: String!,
    $city: String,
    $address: String,
    $products: Json!
  ) {
    createOrder(
      data: {
        name: $name, 
        phoneNumber: $phoneNumber, 
        totalPrice: $totalPrice, 
        paid: false, 
        paymentMethod: $paymentMethod, 
        deliveryMethod: $deliveryMethod,
        city: $city,
        address: $address,
        products: $products
      }
    ) {
      id
    }
  }
`;

export const PUBLISH_ORDER = gql`
  mutation publishOrder($id: ID!) {
    publishOrder(to: PUBLISHED, where: { id: $id }, publishBase: true) {
      id
    }
  }
`;
