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
    label(language: String): Label
    description(language: String): Description
    claims(propertyIDs: [String]): [Claim]
    # sitelinks: [Sitelink]
  }
`;

module.exports = typeDefs;
