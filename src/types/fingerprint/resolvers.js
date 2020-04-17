module.exports = {
  FingerprintProvider: {
    labels: (_, args) => {
      if( args.language ) {
        return [ _.labels[args.language] ];
      }
      return [].concat(...Object.values(_.labels) );
    },

    descriptions: (_, args) => {
      if( args.language ) {
        return [ _.descriptions[args.language] ];
      }
      return [].concat(...Object.values(_.descriptions) );
    },

    aliases: (_, args) => {
      return _.aliases[args.language]
    },

    __resolveType(entity) {
      // duplicated in StatementsProvider, could be extracted if it pops up more often
      return entity.type === 'item' ? 'Item' : 'Property';
    }
  }
};
