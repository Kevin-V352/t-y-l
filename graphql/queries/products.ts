import { gql } from 'graphql-request';

export const GET_FILTERED_PRODUCTS = gql`
  query getFilteredProducts($category: [Categories!], $sort: ProductOrderByInput, $searchTerm: String) {
    products(
      where: { 
        title_contains: $searchTerm,
        categories_contains_some: $category
      },
      orderBy: $sort
    ) {
      img {
        url
      }
      title
      price
      slug
    }
  }
`;
