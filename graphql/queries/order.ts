import { gql } from 'graphql-request';

export const GET_ORDER_MIN = gql`
  query getOrder ($id: ID!) {
    order(where: { id: $id }) {
      id
      paid
    }
  }
`;

export const GET_LAST_ORDER_NUMBER = gql`
  query getLastOrderNumber {
    orders(last: 1) {
      orderNumber
    }
  }
`;
