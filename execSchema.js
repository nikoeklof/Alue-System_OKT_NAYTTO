const { makeExecutableSchema } = require("@graphql-tools/schema")
const { merge } = require("lodash")

const UserSchema = require("./schema/user.js")
const AreaSchema = require("./schema/area.js")

const UserResolver = require("./resolver/user.js")
const AreaResolver = require("./resolver/area.js")

module.exports = makeExecutableSchema({
    typeDefs: [UserSchema, AreaSchema],
    resolvers: merge(UserResolver, AreaResolver),
})