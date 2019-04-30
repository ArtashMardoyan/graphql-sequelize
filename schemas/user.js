'use strict';

module.exports = `
  type User {
    id: Int!
    email: String!
    username: String!
    location: Location
    createdAt: String!
    updatedAt: String!
  }
  type Query {
    getUser(id: Int!): User!
    getUsers: [User!]!
  }
  type Mutation {
    createUser(username: String!, email: String!, password: String!): User!
  }
`;
