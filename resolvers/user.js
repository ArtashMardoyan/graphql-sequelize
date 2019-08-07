'use strict';

const _ = require('lodash');

const { Location, User, sequelize } = require('../data/models');

module.exports = {
    Query: {
        getUser: async (parent, { id }, { user }) => {
            return User.scope({ method: ['expand'] }).findByPk(id);
        },
        getUsers: async (parent, args, { user }) => {
            return User.scope({ method: ['expand'] }).findAll();
        }
    },
    Mutation: {
        createUser: async (parent, args) => {
            const userFields = ['email', 'password', 'firstName', 'lastName'];
            const { location } = args;

            return sequelize.transaction(async transaction => {
                const model = await User.create(_.pick(args, userFields), { transaction });

                if (!_.isEmpty(location)) {
                    model.location = await Location.create({ userId: model.id, ...location }, { transaction });
                }

                return model;
            });
        }
    }
};
