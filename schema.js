const { gql } = require("apollo-server")


//korjaa AREA
const typeDefs = gql`
  type Area {
    id: ID!
    info: {
      type: String!
      name: String!
      quarter: String!
      address: String!
      buildings: Int!
      townHouse: Int!
      map: {
        zone: String!
        cordinates: {lan: String!, lon: String!}!
      }
    }
    borrowedList: {

    }
  }

  type User {
    email
  }
  
  type Query {
    areaCount: Int!
    ownerCount: Int!
    allOwners: [Owner]!
    allAreas: [Area]!
  }
  type Mutation {

  }
`

module.exports = typeDefs