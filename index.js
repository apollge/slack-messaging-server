import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import typeDefs from './schema';
import resolvers from './resolvers';
import models from './models';

const server = new ApolloServer({ typeDefs, resolvers });
const app = express();

server.applyMiddleware({ app });

models.sequelize.sync().then(function () {
  app.listen({ port: 8080 }, () =>
    console.log(`🚀 Server ready at http://localhost:8080${server.graphqlPath}`)
  );
});
