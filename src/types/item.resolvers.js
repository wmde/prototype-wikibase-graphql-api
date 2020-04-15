const dummyData = require('../dummyData');

const q42 = dummyData().entities.Q42;

module.exports = {
  Query: {
    item: (_, args, ctx) => {
      return q42;
    }
  },
  Item: {
    label: (_, args, ctx ) => {
      return q42.labels[ args.language ];
    },
    claims: () => {
      return [].concat(...Object.values(q42.claims));
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
