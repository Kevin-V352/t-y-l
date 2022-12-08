import { GraphQLClient } from 'graphql-request';

const hygraph = new GraphQLClient(
  process.env.HYGRAPH_PROJECT_API ?? '',
  { headers: { authorization: `Bearer ${process.env.HYGRAPH_PROD_AUTH_TOKEN}` } }
);

export default hygraph;
