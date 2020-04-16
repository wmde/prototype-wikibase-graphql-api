const { gql } = require('apollo-server');

module.exports = gql`
  interface FingerprintProvider {
    label(language: String): Label
    description(language: String): Description
    # aliases: [Alias]]
  }

  type Label {
    language: String!
    value: String!
  }

  type Description {
    language: String!
    value: String!
  }
`;
