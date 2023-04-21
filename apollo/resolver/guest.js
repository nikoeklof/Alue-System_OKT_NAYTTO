const { UserInputError } = require('apollo-server');

const Guest = require('../../models/guest');
const Area = require('../../models/area');
const contextCheck = require('../../util/contextCheck');

module.exports = {
	Query: {
		guestCount: () => Guest.collection.countDocuments(),
		allGuests: async () => await Guest.find({}),
	},

	Guest: {
		email: (root) => root.email,
		areas: async (root) =>
			await Area.find({ ['shareState.sharedTo']: root.email }),
	},

	Mutation: {
		createGuest: (root, args) => {
			const guest = new Guest({ ...args });
			return guest.save().catch((error) => {
				throw new UserInputError(error.message, {
					invalidArgs: args,
				});
			});
		},

		editGuest: async (root, args) => {
			const guest = await Guest.findById(args.guestId);

			if (!guest) throw new UserInputError('Guest not found');

			guest.email = args.email;

			return guest.save().catch((error) => {
				throw new UserInputError(error.message, {
					invalidArgs: args,
				});
			});
		},
	},
};
