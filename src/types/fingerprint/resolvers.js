module.exports = {
  FingerprintProvider: {
    label: (_, args) => {
      return _.labels[args.language];
    },

    description: (_, args) => {
      return _.descriptions[args.language];
    },

    __resolveType(entity) {
      // duplicated in StatementsProvider, could be extracted if it pops up more often
      return entity.type === 'item' ? 'Item' : 'Property';
    }
  }
};
