import { gql } from 'graphql-request';

export const GET_HOME_CONTENT = gql`
  query getHomeContent {
    homeContent(where: { id: "clcy4skyp5bmi0bk489iq8gmb" }) {
      image1 {
        url
      }
      image2 {
        url
      }
      categories1 {
        category
        img {
          url
        }
      }
      categories2 {
        category
        img {
          url
        }
      }
    }
    lastProducts: products(last: 10) {
      img(first: 1) {
        url
      }
      title
      price
      slug
    }
    popularProducts: products(where: { categories_contains_some: popular }) {
      img(first: 1) {
        url
      }
      title
      price
      slug
    }
  }
`;
