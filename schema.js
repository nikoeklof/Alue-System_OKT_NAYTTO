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
    sharedTo: Guest
    sharedBy: User
    date: ShareDate
  }

  type ShareDate {
    shareDate: String
    returnDate: String
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
    createUser (username: String!, password: String!, questId: String!): User
    createArea (type: String!, cityName: String!, quarter: String!, address: String!, buildings: Int!, homes: Int!, zone: String!, lan: String!, lon: String!, misc: String): Area
    login (username: String!, password: String!): Token
  }
`

module.exports = typeDefs