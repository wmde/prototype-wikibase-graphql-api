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
    labels(language: String): [Label]
    descriptions(language: String): [Description]
    claims(propertyIDs: [String]): [Claim]
    aliases(language: String): [Alias]
    sitelinks: [Sitelink]
  }

  type Sitelink {
    site: String!
    title: String!
    url: String # sadly not contained in the wgetentities response (but included in Special:EntityData)
    badges: [String] # could be a list of items?
  }
`;

module.exports = typeDefs;
