'use strict';

import { User } from '../data/models';

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
        createUser: (parent, args) => User.create(args)
    }
};
