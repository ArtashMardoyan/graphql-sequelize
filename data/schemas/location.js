'use strict';

module.exports = `
  type Location {
    id: String!
    userId: User!
    address: String!
    country: String!
    zipCode: String!
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
    createLocation(
       address: String!
       country: String!
       zipCode: String!
       latitude: String!
       longitude: String!
    ): Location!
  }
`;
