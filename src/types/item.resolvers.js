const dummyData = require('../dummyData');

const q42 = dummyData().entities.Q42;

module.exports = {
  Query: {  
    item: () => {
      return q42;
    }
  },
  Item: {
    label: (_, args) => {
      return q42.labels[args.language];
    },
    claims: (_) => {
      return [].concat(...Object.values(_.claims));
    }
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
