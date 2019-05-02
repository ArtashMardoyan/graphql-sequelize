'use strict';

module.exports = `
  type User {
    id: String!
    email: String!
    cover: String!
    avatar: String!
    username: String!
    lastName: String!
    firstName: String!
    location: Location
    createdAt: String!
    updatedAt: String!
  }
  type Query {
    getUser(id: Int!): User!
    getUsers: [User!]!
  }
  type Mutation {
    createUser(
       email: String!, 
       cover: String!
       avatar: String!
       username: String!, 
       firstName:String!,
       password: String!,
    ): User!
  }
`;
