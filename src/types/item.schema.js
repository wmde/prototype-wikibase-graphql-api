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
    label(language: String): Label
    ## Implement those later
    description(language: String): Description
    # aliases: [Alias]]
    claims(propertyId: String): [Claim]
    # sitelinks: [Sitelink]
  }

  type Label {
      language: String!
      value: String!
  }

  type Description {
      language: String!
      value: String!
  }

  type Claim {
    id: String!
    mainsnak: Snak!
    references: [Reference]
  }

  interface Snak {
    property: String! # We probably want this to be a Property object and not a string at some point
    snaktype: String!
    datatype: String!
  }

  type PropertyValueSnak implements Snak {
    property: String! # We probably want this to be a Property object and not a string at some point
    snaktype: String!
    datatype: String!

    datavalue: Value!
  }

  union Value = Item | StringValue | UnknownValue

  type StringValue {
    value: String!
  }

  type UnknownValue { # This value type doesn't actually exist and acts as a fallback for unknown/not yet implemented values
    value: String
  }

  type PropertyNoValueSnak implements Snak {
    property: String! # We probably want this to be a Property object and not a string at some point
    snaktype: String!
    datatype: String!
  }

  type PropertySomeValueSnak implements Snak {
    property: String! # We probably want this to be a Property object and not a string at some point
    snaktype: String!
    datatype: String!
  }

  type Reference {
    hash: String
    snaks: [Snak]
    snakOrder: [String]
  }
  type Query {
    item(id: String!): Item!
  }
`;

module.exports = typeDefs;
