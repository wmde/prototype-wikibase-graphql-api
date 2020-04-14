const { gql } = require('apollo-server');

const typeDefs = gql`
  type Item {
    pageid: Int!
    ns: Int!
    title: String!
    lastrevid: Int!
    modified: String!
    type: String!
    id: String!
    label(language: String): Label!
    ## Implement those later
    # descriptions: [Description]
    # aliases: [Alias]]
    # claims: [Claim]
    # sitelinks: [Sitelink]
  }

  type Label {
      language: String!
      value: String!
  }

  type Query {
    item: Item!
  }
`;

module.exports = typeDefs;