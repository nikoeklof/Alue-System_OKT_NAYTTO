const { UserInputError, AuthenticationError } = require('apollo-server');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const contextCheck = require('../util/contextCheck');

module.exports = {
	Query: {
		userCount: () => User.collection.countDocuments(),
		allUsers: async (root, args) => {
			const newArgs = {}

			if (args.admin)
				newArgs["rank.admin"] = args.admin

			if (args.disabled)
				newArgs["rank.disabled"] = args.disabled

			if (args.worker)
				newArgs["rank.worker"] = args.worker

			return await User.find(newArgs)
		},
		me: (root, args, contextValue) => contextValue.authUser,
	},

	User: {
		email: (root) => root.email,
		rank: (root) => root.rank,
		areas: async (root) => await Area.find({ ['shareState.sharedTo']: root.email }),
	},

	Mutation: {
		login: async (root, args) => {
			const user = await User.findOne({ email: args.email })

			if (!user) throw new AuthenticationError('User not found');

			if (user.disabled)
				throw new AuthenticationError('User account is disabled');

			if (!(await bcrypt.compare(args.password, user.password)))
				throw new AuthenticationError('Invalid password');

			const userForToken = {
				email: user.email,
				id: user._id
			};

			return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
		},

		createUser: async (root, args) => {
			if (args.password.length < 5)
				throw new UserInputError(
					'Password must have at least minimum 5 letters'
				);

			const user = new User({
				email: args.email,
				password: await bcrypt.hash(args.password, 10)
			});

			return user.save().catch((error) => {
				throw new UserInputError(error.message, {
					invalidArgs: args,
				});
			});
		},

		editUserEmail: async (root, args, contextValue) => {
			const user = contextCheck(contextValue.authUser, 0);

			if (!user) throw new UserInputError('Guest not found');

			user.email = args.newEmail;

			return user.save().catch((error) => {
				throw new UserInputError(error.message, {
					invalidArgs: args,
				});
			});
		},

		editUserPassword: async (root, args, contextValue) => {
			const user = contextCheck(contextValue.authUser, 0)

			if (args.password.length < 5)
				throw new UserInputError(
					'Password must have at least minimum 5 letters'
				);

			user.security.password = await bcrypt.hash(args.password, 10);

			return user.save().catch((error) => {
				throw new UserInputError(error.message, {
					invalidArgs: args,
				});
			});
		},

		editUserAbout: async (root, args, contextValue) => {
			const user = contextCheck(contextValue.authUser, 0);

			user.aboutMe = args.aboutMe;

			return user.save().catch((error) => {
				throw new UserInputError(error.message, {
					invalidArgs: args,
				});
			});
		},

		deleteUser: async (root, args, contextValue) => {
			const user = contextCheck(contextValue.authUser, 2)

			if (args.userId)
				return await User.findByIdAndDelete(args.userId)

			if (args.email)
				return await User.findOneAndDelete({ email: args.email })

			throw new UserInputError('At least 1 argument is required')
		},

		toggleUserDisabled: async (root, args, contextValue) => {
			contextCheck(contextValue.authUser, 2);

			const user = await User.findById(args.userId);
			user.rank.disabled = !user.disabled;
			return user.save();
		},

		toggleUserWorker: async (root, args, contextValue) => {
			contextCheck(contextValue.authUser, 2);

			const user = await User.findById(args.userId);
			user.rank.worker = !user.disabled;
			return user.save();
		},

		toggleUserAdmin: async (root, args, contextValue) => {
			contextCheck(contextValue.authUser, 2);

			const user = await User.findById(args.userId);
			user.rank.admin = !user.admin;
			return user.save();
		},
	},
};
