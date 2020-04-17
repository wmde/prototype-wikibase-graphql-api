const { gql } = require('apollo-server');

const typeDefs = gql`
  type Item implements FingerprintProvider & StatementsProvider {
    pageid: Int!
    ns: Int!
    title: String!
    lastrevid: Int!
    modified: String!
    type: String!
    id: String!
    labels(language: String, languages: [String]): [Label]
    descriptions(language: String, languages: [String]): [Description]
    claims(propertyIDs: [String]): [Claim]
    aliases(language: String): [Alias]
    # sitelinks: [Sitelink]
  }
`;

module.exports = typeDefs;
