const { ApolloServer } = require("@apollo/server")
const { startStandaloneServer } = require("@apollo/server/standalone")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
require("dotenv").config()

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
  plugins: [
    {
      requestDidStart(requestContext) {
        return {
          didResolveOperation({ operation, operationName }) {
            if (process.env.LOGGING === "1") {
              if (operationName === "IntrospectionQuery")
                return null

              console.log("***")
              console.log("Operation type: " + operation.operation)
              console.log("Operation name: " + operation.loc.source.body.replace(/(\r\n|\n|\r)/gm, "").replace(/\s+/g, ' ').trim())
              console.log("Variables: " + JSON.stringify(requestContext.request.variables))
              console.log("***")
            }
          }
        }
      }
    }
  ],
})

startStandaloneServer(server, {
  listen: { port: process.env.PORT },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth) {
      const decodedToken = jwt.verify(auth, process.env.JWT_SECRET)
      const authUser = await User.findById(decodedToken.id)
      if (!authUser.disabled)
        return { authUser }
    }
  },
}).then(({ url }) => {
  console.log("Server ready at", url)
})