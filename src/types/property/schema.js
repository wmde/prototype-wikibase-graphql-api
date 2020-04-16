const { gql } = require('apollo-server');

const typeDefs = gql`
  type Property implements FingerprintProvider & StatementsProvider {
    pageid: Int!
    ns: Int!
    title: String!
    lastrevid: Int!
    modified: String!
    type: String!
    id: String!
    datatype: String!
    label(language: String): Label
    description(language: String): Description
    claims(propertyIDs: [String]): [Claim]
    aliases(language: String): [Alias]
  }
`;

module.exports = typeDefs;
