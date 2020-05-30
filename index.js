import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import express from 'express';
import path from 'path';
import { fileLoader } from 'merge-graphql-schemas';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';

import models from './models';

const typeDefs = mergeTypeDefs(fileLoader(path.join(__dirname, './schema')), {
  all: true,
});

const resolvers = mergeResolvers(
  fileLoader(path.join(__dirname, './resolvers'))
);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { models, user: { id: 1 } },
});
const app = express();
app.use(cors('*'));

server.applyMiddleware({ app });

models.sequelize.sync().then(function () {
  app.listen({ port: 8080 }, () =>
    console.log(`🚀 Server ready at http://localhost:8080${server.graphqlPath}`)
  );
});
