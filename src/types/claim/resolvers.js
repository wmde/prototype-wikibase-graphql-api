const EntityRepository = require('../../dataSources/EntityRepository');

const entityRepo = new EntityRepository(); // should not create a new repository, but reuse the same one that's used elsewhere

module.exports = {
  StatementsProvider: {
    claims: (_, args) => {
      if( args.propertyId ) {
        return _.claims[args.propertyId];
      }
      return [].concat(...Object.values(_.claims));
    },

    __resolveType(entity) {
      // duplicated in StatementsProvider, could be extracted if it pops up more often
      return entity.type === 'item' ? 'Item' : 'Property';
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
};
