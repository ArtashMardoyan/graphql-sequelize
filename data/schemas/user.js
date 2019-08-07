'use strict';

module.exports = `
  input LocationInput {
   city: String!
   country: String!
   latitude: String
   longitude: String
  }
  type User {
    id: ID!
    email: String!
    cover: String
    avatar: String
    lastName: String!
    firstName: String!
    createdAt: String
    updatedAt: String
    location: Location
  }
  type Query {
    getUser(id: String!): User!
    getUsers: [User!]!
  }
  type Mutation {
    createUser(
       email: String!
       cover: String
       avatar: String
       password: String!
       lastName: String!
       firstName: String!
       location: LocationInput
    ): User!
  }
`;
