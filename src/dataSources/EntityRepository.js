const dummyData = require('./dummyData');

module.exports = class EntityRepository {

  getEntity(id) {
    return dummyData.entities[id] || { id };
  }

};
