//const { UserInputError } = require("apollo-server")
const Area = require("./models/area")
const Guest = require("./models/guest")
const User = require("./models/user")

const resolvers = {
    Query: {
        areaCount: () => Area.collection.countDocuments(),
        guestCount: () => Guest.collection.countDocuments(),
        allGuest: async () => await Guest.find({}),
        allAreas: async () => await Area.find({}),
        allUsers: async () => await User.find({})
    },
    Guest: {
        email: (root) => {
            return root.email
        },
        name: (root) => {
            return root.name
        },
        areas: (root) => {
            return root.areas
        }
    },
    User: {
        username: (root) => {
            return root.username
        },
        email: (root) => {
            return root.email
        },
        name: (root) => {
            return root.name
        },
        admin: (root) => {
            return root.admin
        },
        areas: (root) => {
            return root.areas
        }
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
    },
    Mutation: {
        addGuest: (root, args) => {
            const guest = new Guest({ ...args, areas: [] })
            return guest.save()
        }
    }
}

module.exports = resolvers