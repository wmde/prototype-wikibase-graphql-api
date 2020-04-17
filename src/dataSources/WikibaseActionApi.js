const { RESTDataSource } = require('apollo-datasource-rest');
const DataLoader = require('dataloader');

module.exports = class WikibaseActionApi extends RESTDataSource {

  constructor(baseUrl) {
    super();
    this.baseURL = baseUrl;
  }

  async getEntity(id) {
    return this.getEntitiesLoader.load(id);
  }

  getEntitiesLoader = new DataLoader(async (ids) => {
    const getEntitiesResponse = await this.get('', {
      action: 'wbgetentities',
      format: 'json',
      ids: ids.join('|')
    }, {
      maxBatchSize: 50,
    });

    return ids.map(id => getEntitiesResponse.entities[id]);
  });

  willSendRequest(request) {
    console.log(request);
  }

}
