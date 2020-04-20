const { gql } = require('apollo-server');

module.exports = gql`
  type Query {
    item(id: String!): Item!
    search(query: String!, language: String!): [Item!]
  }
`;
