'use strict';

import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import { makeExecutableSchema } from 'graphql-tools';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

import models from './data/models';
import config from './config';

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schemas')));
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

models.sequelize.sync({}).then(() => {
    console.info(`Server is running on port : ${port}`);
    app.listen(port);
});
