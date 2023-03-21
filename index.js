const { ApolloServer } = require("@apollo/server")
const { startStandaloneServer } = require("@apollo/server/standalone")
const mongoose = require("mongoose")
require("dotenv").config()
const jwt = require("jsonwebtoken")

const resolvers = require("./resolvers")
const typeDefs = require("./schema")

const User = require("./models/user")

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
  listen: { port: process.env.PORT },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth) {
      const decodedToken = jwt.verify(auth, process.env.JWT_SECRET)
      const authUser = await User.findById(decodedToken.id)
      return { authUser }
    }
  },
}).then(({ url }) => {
  console.log("Server ready at", url)
})