const { gql } = require('apollo-server');

module.exports = gql`
  type Query {
    item(id: String!): Item!
    search(query: String!, language: String!, entityType: String): [EntitySearchResult]
  }
  type EntitySearchResult implements StatementsProvider & FingerprintProvider {
    id: String!
    title: String!
    labels(languages: [String]): [Label]
    descriptions(languages: [String]): [Description]
    aliases(language: String): [Alias]
    claims(propertyIDs: [String]): [Claim]
  }
`;
