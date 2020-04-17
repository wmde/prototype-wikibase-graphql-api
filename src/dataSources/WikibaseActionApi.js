const { RESTDataSource } = require('apollo-datasource-rest');
const DataLoader = require('dataloader');
const packageInfo = require('../../package.json');

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
    });

    return ids.map(id => getEntitiesResponse.entities[id]);
  }, {
    maxBatchSize: 50,
  });

  _getUserAgentString() {
    const appInformation = `${packageInfo.name}/${packageInfo.version}`;
    const authorInfo = `${packageInfo.author}`;
    const libraryInfo = `apollo-datasource-rest/${packageInfo.dependencies['apollo-datasource-rest']}`;

    return `${appInformation} (${authorInfo}) ${libraryInfo}`;
  }

  willSendRequest(request) {
    console.log(request);
    request.headers.set('User-agent', this._getUserAgentString());
  }

}
