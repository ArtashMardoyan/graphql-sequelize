'use strict';

const path = require('path');
const app = new (require('koa'))();
const { ApolloServer } = require('apollo-server-koa');
const { fileLoader, mergeTypes, mergeResolvers } = require('merge-graphql-schemas');

const config = require('./config');

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './data/schemas')));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app });

const port = config.get('PORT');

app.listen({ port }, () => console.log(`🚀 Server ready at ${config.get('API_URL')}:${port}${server.graphqlPath}`));
