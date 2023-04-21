const { UserInputError, AuthenticationError } = require('apollo-server');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Guest = require('../../models/guest');
const User = require('../../models/user');
const contextCheck = require('../../util/contextCheck');

module.exports = {
	Query: {
		userCount: () => User.collection.countDocuments(),
		allUsers: async (root, args) =>
			await User.find({ ...args, disabled: false }),
		me: (root, args, contextValue) => contextValue.authUser,
	},

	User: {
		admin: (root) => root.admin,
		disabled: (root) => root.disabled,
		guestAccount: async (root) => await Guest.findById(root.guestId),
	},

	Mutation: {
		login: async (root, args) => {
			const guest = await Guest.findOne({ email: args.email });

			if (!guest) throw new AuthenticationError('Invalid email');

			const user = await User.findOne({ guestId: guest._id });

			if (!user) throw new AuthenticationError('User not found');

			if (user.disabled)
				throw new AuthenticationError('User account is disabled');

			if (!(await bcrypt.compare(args.password, user.password)))
				throw new AuthenticationError('Invalid password');

			const userForToken = {
				email: guest.email,
				id: user._id,
			};

			return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
		},

		createUser: async (root, args) => {
			if (args.password.length < 5)
				throw new UserInputError(
					'Password must have at least minimum 5 letters'
				);

			const guest = await Guest.findOne({ email: args.email });

			if (!guest)
				throw new UserInputError('Invalid email, guest not found');

			const user = new User({
				guestId: guest._id,
				password: await bcrypt.hash(args.password, 10),
			});

			return user.save().catch((error) => {
				throw new UserInputError(error.message, {
					invalidArgs: args,
				});
			});
		},

		changeUserPassword: async (root, args, contextValue) => {
			const user = contextCheck(contextValue.authUser, false);

			if (args.password.length < 5)
				throw new UserInputError(
					'Password must have at least minimum 5 letters'
				);

			user.password = await bcrypt.hash(args.password, 10);

			return user.save().catch((error) => {
				throw new UserInputError(error.message, {
					invalidArgs: args,
				});
			});
		},

		editUser: async (root, args) => {
			const user = await User.findById(args.userId);

			if (!user) throw new UserInputError('User not found');

			user.admin = args.admin;

			return user.save().catch((error) => {
				throw new UserInputError(error.message, {
					invalidArgs: args,
				});
			});
		},

		changeUserAbout: async (root, args, contextValue) => {
			const user = contextCheck(contextValue.authUser, false);

			user.aboutMe = args.aboutMe;

			return user.save().catch((error) => {
				throw new UserInputError(error.message, {
					invalidArgs: args,
				});
			});
		},

		addUserRank: async (root, args, contextValue) => {
			const user = contextCheck(contextValue.authUser, false);

			user.rank.push(args.rank);

			return user.save().catch((error) => {
				throw new UserInputError(error.message, {
					invalidArgs: args,
				});
			});
		},

		removeUserRank: async (root, args, contextValue) => {
			const user = contextCheck(contextValue.authUser, false);

			user.rank.splice(user.rank.indexOf(args.rank), 1);

			return user.save().catch((error) => {
				throw new UserInputError(error.message, {
					invalidArgs: args,
				});
			});
		},
	},
};
