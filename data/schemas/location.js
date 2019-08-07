'use strict';

module.exports = `
  type Location {
    id: ID
    userId: User
    city: String
    country: String
    latitude: String
    longitude: String
    createdAt: String
    updatedAt: String
  }
   type Query {
    getLocation(id: Int!): Location!
    getLocations: [Location!]!
  }
  type Mutation {
    createLocation(
       city: String!
       country: String!
       latitude: String
       longitude: String
    ): Location!
  }
`;
