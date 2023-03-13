const { ApolloServer } = require("@apollo/server")
const { startStandaloneServer } = require("@apollo/server/standalone")

let areas = [
  {
    id: "1",
    name: "Pohjoinen",
    cordinates: { lan: "0", lon: "0" },
    zone: null,
    buildings: 50,
    info: "info",
    shared: {
      isTrue: false,
      ownerId: null,
      shareDate: null
    }
  }, {
    id: "1",
    name: "Etelä",
    cordinates: { lan: "0", lon: "0" },
    zone: null,
    buildings: 25,
    info: null,
    shared: {
      isTrue: true,
      ownerId: "1",
      shareDate: "0.0.0000"
    }
  }
]

let owners = [
  {
    id: "1",
    name: "Mr. X",
    email: "X@isComingForYou.com",
  }
]

const typeDefs = `
  type Area {
    id: ID!
    name: String
    cordinates: {lan: String, lon: String}
    zone: String
    buildings Int!
    info: String
    shared: {
      isTrue: Boolean!
      ownerId: String
      sharedDate: String
    }
  }

  type Owner {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    areasCount: Int!
    allAreas: [Area!]!
    findAreaByName(name: String!): Area!
    ownerCount: Int!
    allOwners: [Owner!]!
  }
`

const resolvers = {
  Query: {
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})