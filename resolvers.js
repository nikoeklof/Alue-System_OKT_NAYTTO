const Area = require("./models/area")
const Owner = require("./models/owner")

// Puuttuu ADMIN

const resolvers = {
    Query: {
        areaCount: () => Area.collection.countDocuments(),
        ownerCount: () => Owner.collection.countDocuments(),
        allOwners: async () => await Owner.find({}),
        allAreas: async () => await Area.find({}),
    },
    Owner: {
        email: (root) => {
            return root.email
        },
    },
    Area: {
        info: (root) => {
            return root.info
        },
        state: (root) => {
            return root.state
        },
        date: (root) => {
            return root.date
        }
    }
}

module.exports = resolvers