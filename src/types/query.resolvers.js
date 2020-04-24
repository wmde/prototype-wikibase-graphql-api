module.exports = {
  Query: {
    item: async (_, { id }, { dataSources }) => {
      return dataSources.wbRepo.getEntity(id.toUpperCase());
    },
    search: async (_, { query, language, entityType }, { dataSources }) => {
      return dataSources.wbRepo.searchEntities(query, language, entityType);
    }
  }
};
