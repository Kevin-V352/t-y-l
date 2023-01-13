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
