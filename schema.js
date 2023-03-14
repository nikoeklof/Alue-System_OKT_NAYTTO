const { gql } = require("apollo-server")

const typeDefs = gql`
  type Guest {
    id: ID!
    email: String!
    name: String!
    areas: Array!
  }

  type User {
    id: ID!
    email: String!
    name: String!
    admin: Boolean!
    areas: Array!
  }

  type Area {
    id: ID!
    info: {
      type: String
      cityName: String
      quarter: String
      address: String
      buildings: Int
      homes: Int
      map: {
        coordinates: {
          lan: String
          lon: String
        }
        zone: String
      }
      misc: String
    }
    shareState: {
      isShared: Boolean!
      sharedTo: Guest
      sharedBy: User
      date: {
        shareDate: String
        returnDate: String
      }
    }
  }
  
  type Query {
    ownerCount: Int!
    allOwners: [Owner]!

    areaCount: Int!
    allAreas: [Area]!
  }

  type Mutation {
    addGuest(
      email: String!
      name: String!
    ): Guest
  }
`

module.exports = typeDefs