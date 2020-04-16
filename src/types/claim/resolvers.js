module.exports = {
  StatementsProvider: {
    claims: (_, { propertyIDs }) => {
      const claims = [].concat(...Object.values(_.claims));

      if (propertyIDs) {
        return claims.filter(claim => propertyIDs.includes(claim.mainsnak.property));
      }

      return claims;
    },

    __resolveType(entity) {
      // duplicated in StatementsProvider, could be extracted if it pops up more often
      return entity.type === 'item' ? 'Item' : 'Property';
    }
  },
  Claim: {
    references: (_) => {
      return _.references;
    },
    qualifiers: (_, { propertyId }) => {
      if (_.qualifiers && _.qualifiers[propertyId]) {
        return _.qualifiers[propertyId];
      }
      return [];
    }
  },
  Reference: {
    snaks: (_) => {
      return [].concat(...Object.values(_.snaks));
    }
  },
  Snak: {
    property: async ({ property }, _, { dataSources }) => {
      return dataSources.wbRepo.getEntity(property);
    },
    __resolveType(snak) {
      return {
        value: 'PropertyValueSnak',
        novalue: 'PropertyNoValueSnak',
        somevalue: 'PropertySomeValueSnak'
      }[snak.snaktype];
    }
  },
  PropertyValueSnak: {
    datavalue: async (snak, _, { dataSources }) => {
      if (snak.datatype === 'wikibase-item') {
        return dataSources.wbRepo.getEntity(snak.datavalue.value.id);
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
