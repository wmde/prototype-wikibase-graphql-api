const { RESTDataSource } = require('apollo-datasource-rest');

module.exports = class WikibaseActionApi extends RESTDataSource {

  constructor(baseUrl) {
    super();
    this.baseURL = baseUrl;
  }

  async getEntity(id) {
    const result = await this.get('', {
      action: 'wbgetentities',
      format: 'json',
      ids: [id]
    });

    return result.entities[id];
  }

}
