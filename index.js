'use strict';

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const { makeExecutableSchema } = require('graphql-tools');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { fileLoader, mergeTypes, mergeResolvers } = require('merge-graphql-schemas');

const config = require('./config');

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './data/schemas')));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express();

const graphqlEndpoint = '/graphql';
const port = config.get('PORT');

app.use(
    graphqlEndpoint,
    bodyParser.json(),
    graphqlExpress({
        schema,
        ctx: { user: { id: 1 } }
    })
);

app.use('/graphiql', graphiqlExpress({ endpointURL: graphqlEndpoint }));

console.info(`Server is running on port : ${port}`);
app.listen(port);
