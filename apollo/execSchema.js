const { makeExecutableSchema } = require("@graphql-tools/schema")
const { merge } = require("lodash")

const GuestSchema = require("./schema/guest.js")
const UserSchema = require("./schema/user.js")
const AreaSchema = require("./schema/area.js")

const GuestResolver = require("./resolver/guest.js")
const UserResolver = require("./resolver/user.js")
const AreaResolver = require("./resolver/area.js")

module.exports = makeExecutableSchema({
    typeDefs: [GuestSchema, UserSchema, AreaSchema],
    resolvers: merge(GuestResolver, UserResolver, AreaResolver),
})