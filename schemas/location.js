'use strict';

module.exports = `
  type Location {
    id: Int!
    userId: User!
    country: String!
    latitude: String!
    longitude: String!
    createdAt: String!
    updatedAt: String!
  }
   type Query {
    getLocation(id: Int!): Location!
    getLocations: [User!]!
  }
  type Mutation {
    createLocation(country: String!): Location!
  }
`;
