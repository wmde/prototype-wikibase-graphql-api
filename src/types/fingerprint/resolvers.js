function filterTerms(termsMap, { languages }) {
  const terms = Object.values(termsMap);

  return languages ? terms.filter(term => languages.includes(term.language)) : terms;
}

module.exports = {
  FingerprintProvider: {
    labels: ({ labels }, args) => {
      return filterTerms(labels, args);
    },

    descriptions: ({ descriptions }, args) => {
      return filterTerms(descriptions, args)
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
