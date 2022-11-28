import { gql } from 'graphql-request';

export const GET_FILTERED_PRODUCTS = gql`
  query getFilteredProducts($brand: String) {
    products(where: { brand_contains: $brand }) {
      img {
        url
      }
      title
      price
      slug
    }
  }
`;
