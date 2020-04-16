const EntityRepository = require('../dataSources/EntityRepository');

const entityRepo = new EntityRepository();

module.exports = {
  Query: {
    item: (_, { id }) => {
      return entityRepo.getEntity( id.toUpperCase() );
    }
  },
  Item: {
    label: (_, args) => {
      return _.labels[args.language];
    },
    claims: (_, args) => {
      if( args.propertyId ) {
        return _.claims[args.propertyId];
      }
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
        return entityRepo.getEntity(snak.datavalue.value.id);
      }

      return snak.datavalue;
    }
  },
  Value: {
    __resolveType: (datavalue) => {
      if (datavalue.type === 'string') {
        return 'StringValue';
      }
      if (datavalue.type && datavalue.type === 'item') {
        return 'Item';
      }

      return 'UnknownValue';
    }
  }
}
