const {ApolloServer, makeExecutableSchema} = require('apollo-server');
const EntityRepository = require('./dataSources/EntityRepository');

const server = new ApolloServer({
  schema: makeExecutableSchema({
    typeDefs: [
      require('./types/query.schema'),
      require('./types/item/schema'),
      require('./types/property/schema'),
      require('./types/claim/schema'),
      require('./types/fingerprint/schema')
    ],
    resolvers: {
      ...require('./types/query.resolvers'),
      ...require('./types/item/resolvers'),
      ...require('./types/property/resolvers'),
      ...require('./types/claim/resolvers'),
      ...require('./types/fingerprint/resolvers')
    },
    inheritResolversFromInterfaces: true
  }),
  dataSources: () => ({
    wbRepo: new EntityRepository()
  }),
});

server.listen().then(() => {
  console.log(`🚀  Server ready at port ${process.env.PORT}`);
});
