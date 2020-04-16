const { gql } = require('apollo-server');

module.exports = gql`
  interface StatementsProvider {
    claims(propertyId: String): [Claim]
  }
  
  type Claim {
    id: String!
    mainsnak: Snak!
    qualifier(propertyId: String): [Qualifier]
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

  type Qualifier implements Snak {
    property: String! # We probably want this to be a Property object and not a string at some point
    snaktype: String!
    datatype: String!

    hash: String!
    datavalue: Value
  }

  type Reference {
    hash: String
    snaks: [Snak]
    snakOrder: [String]
  }
`;
