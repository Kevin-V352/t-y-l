import { gql } from 'graphql-request';

export const UPDATE_PRODUCT_QUANTITY = gql`
  mutation updateProductQuantity($id: ID, $stock: Int) {
    updateProduct(data: {
      stock: $stock
    }, where: { id: $id }) {
      id,
      stock
    }
  }
`;

export const PUBLISH_MANY_PRODUCTS = gql`
  mutation publishManyProducts($ids: [ID!]) {
    publishManyProducts(to: PUBLISHED, where: { id_in: $ids }, publishBase: true) {
      count
    }
  }
`;
