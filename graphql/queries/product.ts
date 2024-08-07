import { gql } from 'graphql-request';

export const GET_FILTERED_PRODUCTS = gql`
  query getFilteredProducts(
      $category: [Categories!], 
      $sort: ProductOrderByInput, 
      $searchTerm: String,
      $skip: Int
    ) {
    productsConnection(
      where: { 
        title_contains: $searchTerm,
        categories_contains_some: $category
      },
      orderBy: $sort,
      skip: $skip
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          img(first: 1) {
            url
          }
          title
          price
          slug
        }
      }
    }
  }
`;

export const GET_ALL_PRODUCTS_FOR_THE_MENU = gql`
  query getAllProductsForTheMenu {
    products(first: 100) {
      title
      price
      categories
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

export const GET_PRODUCTS_BY_CATEGORY = gql`
  query getProductsByIds($category: [Categories!]) {
    products(where: { categories_contains_some: $category }, first: 10) { 
      id
      title
      price
      slug
      img(first: 1) {
        url
      }
    }
  }
`;

export const GET_PRODUCT_PRICES_AND_STOCK_BY_IDS = gql`
  query getProductsByIds($ids: [ID]) {
    products(where: { id_in: $ids }) {
      id
      price
      stock
    }
  }
`;

export const GET_EXTRA_DATA_BY_ID = gql`
  query getCurrentPriceOfProduct($id: ID) {
    product(where: { id: $id }) {
      price
      stock
      categories
    }
  }
`;

export const GET_PRODUCT_QUANTITIES_BY_IDS = gql`
  query getProductsByIds($ids: [ID]) {
    products(where: { id_in: $ids }) {
      id
      stock
    }
  }
`;
