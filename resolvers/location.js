'use strict';

const { Location } = require('../data/models');

module.exports = {
    Query: {
        getLocation: async (parent, { id }, { user }) => {
            return Location.findByPk(id);
        },
        getLocations: async (parent, args, { user }) => {
            return Location.findAll();
        }
    },
    Mutation: {
        createLocation: async (parent, args, { models, user }) => {
            return Location.create({ ...args, userId: user.id });
        }
    }
};
