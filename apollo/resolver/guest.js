const { UserInputError } = require("apollo-server")

const Guest = require("../../models/guest")
const Area = require("../../models/area")

module.exports = {
    Query: {
        guestCount: () => Guest.collection.countDocuments(),
        allGuests: async () => await Guest.find({}),
    },

    Guest: {
        email: (root) => root.email,
        areas: async (root) => await Area.find({ ["shareState.sharedTo"]: root.email })
    },

    Mutation: {
        createGuest: (root, args) => {
            const guest = new Guest({ ...args })
            return guest.save()
                .catch(error => {
                    throw new UserInputError(error.message, {
                        invalidArgs: args,
                    })
                })
        }
    }
}