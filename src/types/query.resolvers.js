const EntityRepository = require('../dataSources/EntityRepository');

const entityRepo = new EntityRepository(); // should not create a new repository, but reuse the same one that's used elsewhere

module.exports = {
  Query: {
    item: (_, { id }) => {
      return entityRepo.getEntity(id.toUpperCase());
    }
  }
};
