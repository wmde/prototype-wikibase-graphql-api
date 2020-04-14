const dummyData = require('../dummyData');

module.exports = {
  Query: {
    item: (_, args, ctx) => {
      return dummyData().entities.Q42;
    }
  }
}
