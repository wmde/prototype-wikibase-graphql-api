const { ApolloServer } = require('apollo-server');
const typeDefs = require('./types/item.schema');
const resolvers = require('./types/item.resolvers');

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(() => {
    console.log(`🚀  Server ready at port ${process.env.PORT}`);
});
