const { gql } = require("apollo-server")

const typeDefs = gql`
  type Guest {
    id: ID!
    email: String!
    areas: [Area]!
  }

  type User {
    id: ID!
    admin: Boolean
    disabled: Boolean
    guestAccount: Guest
  }

  type Area {
    id: ID!
    info: Info!
    shareState: ShareState!
    shareHistory: [Shares]
  }

  type Shares {
    sharedTo: String
    sharedBy: String
    shareStartDate: String
    shareEndDate: String
  }

  type latlngs {
    lat: String
    lng: String
  }

  type Info {
    cityName: String!
    quarter: String!
    address: String!
    buildings: Int!
    latlngs: [latlngs]!
    misc: String
  }

  type ShareState {
    isShared: Boolean!
    sharedRequests: [Guest]
    sharedTo: String
    sharedBy: String
    shareStartDate: String
  }
  
  type Query {
    guestCount: Int!
    allGuests: [Guest]!

    areaCount: Int!
    allAreas (cityName: String, quarter: String, address: String, isShared: Boolean): [Area]!

    userCount: Int!
    allUsers (disabled: Boolean, admin: Boolean): [User]!

    me: User
  }

  type Token {
    value: String!
  }

  input latlngsType {
    lat: String
    lng: String
  }

  type Mutation {
    createGuest (email: String!): Guest
    makeRequest (areaId: ID!, email: String!): Area

    createUser (email: String!, password: String!): User
    changeUserPassword (password: String!): User
    allowAreaRequest (areaId: ID!, email: String!): Area
    returnSharedArea (areaId: ID!): Area

    createArea (cityName: String!, quarter: String!, address: String!, buildings: Int!, latlngs: [latlngsType]!, misc: String): Area
    editArea (areaId: ID!, cityName: String, quarter: String, address: String, buildings: Int, misc: String): Area
    deleteArea (areaId: ID!): Area

    login (email: String!, password: String!): Token
  }
`

module.exports = typeDefs