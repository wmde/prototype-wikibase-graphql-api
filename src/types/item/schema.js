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
    labels(languages: [String]): [Label]
    descriptions(languages: [String]): [Description]
    claims(propertyIDs: [String]): [Claim]
    aliases(language: String): [Alias]
    sitelinks(sites: [String]): [Sitelink]
  }

  type Sitelink {
    site: String!
    title: String!
    url: String # sadly not contained in the wgetentities response (but included in Special:EntityData)
    badges: [String] # could be a list of items?
  }
`;

module.exports = typeDefs;
