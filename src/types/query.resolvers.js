module.exports = {
  Query: {
    item: async (_, { id }, { dataSources }) => {
      return dataSources.wbRepo.getEntity(id.toUpperCase());
    },
    search: async (_, { query, language }, { dataSources }) => {
      return dataSources.wbRepo.searchEntities(query, language);
    },
  }
};
