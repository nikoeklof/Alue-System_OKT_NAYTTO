const { gql } = require("apollo-server")

const typeDefs = gql`
  type Owner {
    id: ID!
    email: String!
  }

  type Area {
    id: ID!
    info: {
      type: String!
      name: String!
      quarter: String!
      address: String!
      asuntoja: Int!
      omakotitaloja: Int!
      map: {
        cordinates: {
          lan: String!,
          lon: String!
        }
        zone: String!
      }
      misc: String
    }
    state: {
      lainattu: Boolean!
      lainaaja: String!
      jaettu: Array
    }
    Date: {
      lainattu: String
      palautettu: String
    }
  }
  
  type Query {
    ownerCount: Int!
    allOwners: [Owner]!

    areaCount: Int!
    allAreas: [Area]!
  }
`

module.exports = typeDefs