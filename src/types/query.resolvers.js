module.exports = {
  Query: {
    item: async (_, { id }, { dataSources }) => {
      return dataSources.wbRepo.getEntity(id.toUpperCase());
    }
  }
};
