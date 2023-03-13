const { UserInputError } = require("apollo-server")

const Area = require("./models/area")
const Owner = require("./models/owner")

const resolvers = {
    Query: {
        areaCount: () => Area.collection.countDocuments(),
        ownerCount: () => Owner.collection.countDocuments(),
        allOwners: async () => await Owner.find({}),
        allAreas: async () => await Area.find({}),
    },
}

module.exports = resolvers