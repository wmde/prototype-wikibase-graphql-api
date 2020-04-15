const dummyData = require('../dummyData');

const entities = dummyData().entities;

module.exports = {
  Query: {  
    item: (_, args) => {
      const entityId = args.id.toUpperCase();
      return entities[entityId];
    }
  },
  Item: {
    label: (_, args) => {
      return _.labels[args.language];
    },
    claims: (_) => {
      return [].concat(...Object.values(_.claims));
    },
    description: (_, args ) => {
      return _.descriptions[ args.language ];
    },
  },
  Claim: {
    references: (_) => {
      return _.references;
    }
  },
  Reference: {
    snaks: (_) => {
      return [].concat(...Object.values(_.snaks));
    }
  },
  Snak: {
    __resolveType(snak) {
      return {
        value: 'PropertyValueSnak',
        novalue: 'PropertyNoValueSnak',
        somevalue: 'PropertySomeValueSnak'
      }[snak.snaktype];
    }
  },
  PropertyValueSnak: {
    datavalue: (snak) => {
      if (snak.datatype === 'wikibase-item') {
        return snak.datavalue.value; // contains the item id
      }

      return snak.datavalue;
    }
  },
  Value: {
    __resolveType: (datavalue) => {
      if (datavalue.type === 'string') {
        return 'StringValue';
      }
      if (datavalue['entity-type'] && datavalue['entity-type'] === 'item') {
        return 'Item';
      }

      return 'UnknownValue';
    }
  }
}
