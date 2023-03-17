const { gql } = require("apollo-server")

const typeDefs = gql`
  type Guest {
    id: ID!
    email: String!
    name: String!
    areas: [String]!
  }

  type User {
    id: ID!
    username: String!
    admin: Boolean
    guestAccount: Guest
  }

  type Area {
    id: ID!
    info: Info!
    shareState: ShareState!
    shareHistory: [Shares]
  }

  type Shares {
    sharedTo: Guest
    sharedBy: User
    shareStartDate: String
    shareEndDate: String
  }

  type Info {
    type: String!
    cityName: String!
    quarter: String!
    address: String!
    buildings: Int!
    homes: Int!
    map: Map!
    misc: String
  }

  type Map {
    coordinates: Coordinates!
    zone: String!
  }

  type Coordinates {
    lan: String!
    lon: String!
  }

  type ShareState {
    isShared: Boolean!
    sharedRequests: [Guest]
    sharedTo: Guest
    sharedBy: User
    shareStartDate: String
  }
  
  type Query {
    guestCount: Int!
    allGuests: [Guest]!

    areaCount: Int!
    allAreas: [Area]!

    userCount: Int!
    allUsers: [User]!

    me: User
  }

  type Token {
    value: String!
  }

  type Mutation {
    createGuest (email: String!, name: String!): Guest
    makeRequest (areaId: ID!, guestEmail: String!): String

    createUser (username: String!, password: String!, guestId: String!): User
    toggleUserDisabled (userId: ID!): User
    allowAreaRequest (areaId: ID!, guestId: ID!): String

    createArea (type: String!, cityName: String!, quarter: String!, address: String!, buildings: Int!, homes: Int!, zone: String!, lan: String!, lon: String!, misc: String): Area
    editArea (areaId: ID!, type: String, cityName: String, quarter: String, address: String, buildings: Int, homes: Int, zone: String, lan: String, lon: String, misc: String): Area

    login (username: String!, password: String!): Token
  }
`

module.exports = typeDefs