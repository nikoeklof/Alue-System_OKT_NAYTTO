const { UserInputError } = require("apollo-server")

const Guest = require("../models/guest")
const Area = require("../models/area")

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
        },

        deleteGuest: async (root, args) => {
            const deletedValues = {}

            if (args.guestId) {
                deletedValues.user = await User.findOneAndDelete({ "guestAccount.id": args.guestId })
                deletedValues.guest = await Guest.findByIdAndDelete(args.guestId)

                return deletedValues
            }

            if (args.email) {
                deletedValues.user = await User.findOneAndDelete({ "guestAccount.id": args.guestId })
                deletedValues.guest = await Guest.findOneAndDelete({ email: args.email })

                return deletedValues
            }

            throw new UserInputError("At least 1 argument is required")
        },
    }
}