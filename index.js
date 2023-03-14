const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const mongoose = require("mongoose")
require("dotenv").config()

const resolvers = require("./resolvers")
const typeDefs = require("./schema")

const mongoUrl = process.env.MONGODB_URI

console.log("Connecting to", mongoUrl)

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("Connected to MongoDB")
  })
  .catch((error) => {
    console.log("Error connection to MongoDB:", error.message)
  })

const server = new ApolloServer({
  typeDefs,
  resolvers,
})


startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})