const { UserInputError } = require('apollo-server');

const Guest = require('../models/guest');
const Area = require('../models/area');
const User = require('../models/user');

module.exports = {
    Query: {
        guestCount: () => Guest.collection.countDocuments(),
        allGuests: async () => await Guest.find({}),
    },

    Guest: {
        email: (root) => root.email,
        areas: async (root) => await Area.find({ ['shareState.sharedTo']: root.email }),
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

            if (args.guestId) {
                await User.findOneAndDelete({ 'guestAccount.id': args.guestId })
                return await Guest.findByIdAndDelete(args.guestId)
            }

            if (args.email) {
                await User.findOneAndDelete({ 'guestAccount.email': args.email })
                return await Guest.findOneAndDelete({ email: args.email })
            }

            throw new UserInputError('At least 1 argument is required')
        },

        editGuest: async (root, args) => {
            const guest = await Guest.findById(args.guestId);

            if (!guest) throw new UserInputError('Guest not found');

            guest.email = args.email;

            await User.updateOne({ "guestAccount._id": guest._id }, { $set: { "guestAccount.email": args.email } })

            return guest.save().catch((error) => {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                });
            });
        }
    }
}
