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
      img(first: 1) {
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
      id
      title
      price
      description
      discountRate
      stock
      slug
      img {
        url
      }
    } 
  }
`;

export const GET_PRODUCTS_BY_IDS = gql`
  query getProductsByIds($ids: [ID]) {
    products(where: { id_in: $ids }) {
      id
      title
      price
      stock
      slug
      img(first: 1) {
        url
      }
    }
  }
`;

export const GET_CURRENT_PRICE_OF_PRODUCT = gql`
  query getCurrentPriceOfProduct($id: ID) {
    product(where: { id: $id }) {
      price
    }
  }
`;
