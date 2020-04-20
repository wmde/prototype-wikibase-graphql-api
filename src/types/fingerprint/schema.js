const { gql } = require('apollo-server');

module.exports = gql`
  interface FingerprintProvider {
    labels(languages: [String]): [Label]
    descriptions(languages: [String]): [Description]
    aliases(language: String): [Alias]
  }

  type Label {
    language: String!
    value: String!
  }

  type Description {
    language: String!
    value: String!
  }

  type Alias {
    language: String!
    value: String!
  }
`;
