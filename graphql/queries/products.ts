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

export const GET_ALL_SLUGS = gql`
  query getAllSlugs {
    products {
      slug
    }
  }
`;

export const GET_PRODUCT_BY_SLUG = gql`
  query getProductBySlug($slug: String) {
    product(where: { slug: $slug }) {
      title
      price
      description
      discountRate
      stock
      img {
        url
      }
    } 
  }
`;
