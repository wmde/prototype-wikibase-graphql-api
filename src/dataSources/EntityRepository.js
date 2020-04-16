const dummyData = require('./dummyData');

module.exports = class EntityRepository {

  async getEntity(id) {
    return dummyData.entities[id] || { id };
  }

};
