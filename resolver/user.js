const { UserInputError, AuthenticationError } = require('apollo-server');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require("email-validator");

const User = require('../models/user');
const Area = require('../models/area');
const contextCheck = require('../util/contextCheck');

module.exports = {
	Query: {
		userCount: () => User.collection.countDocuments(),
		allUsers: async (root, args) => {
			const newArgs = {}

			if ("admin" in args)
				newArgs["rank.admin"] = args.admin

			if ("disabled" in args)
				newArgs["rank.disabled"] = args.disabled

			if ("worker" in args)
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
			if (!validator.validate(args.email))
				throw new UserInputError(
					'Invalid email'
				);

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

			if (!validator.validate(args.email))
				throw new UserInputError(
					'Invalid email'
				);

			user.email = args.email;

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

			user.password = await bcrypt.hash(args.password, 10);

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
			contextCheck(contextValue.authUser, 2)

			let user

			if ("userId" in args)
				user = await User.findByIdAndDelete(args.userId)

			else if ("email" in args)
				user = await User.findOneAndDelete({ email: args.email })

			else
				throw new UserInputError('At least 1 argument is required')

			await Area.updateMany({}, { $pull: { "shareState.shareRequests": user._id } })

			return await user.deleteOne()
		},

		editUserEmailAsAdmin: async (root, args, contextValue) => {
			contextCheck(contextValue.authUser, 2)

			if (!validator.validate(args.email))
				throw new UserInputError(
					'Invalid email'
				);

			const user = await User.findById(args.userId)

			if (!user)
				throw new UserInputError("User not found")

			user.email = args.email

			return user.save().catch((error) => {
				throw new UserInputError(error.message, {
					invalidArgs: args,
				});
			});
		},

		editUserPasswordAsAdmin: async (root, args, contextValue) => {
			contextCheck(contextValue.authUser, 2)

			const user = await User.findById(args.userId)

			if (!user)
				throw new UserInputError("User not found")

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

		toggleUserDisabled: async (root, args, contextValue) => {
			contextCheck(contextValue.authUser, 2);

			const user = await User.findById(args.userId);
			user.rank.disabled = !user.rank.disabled;
			return user.save();
		},

		toggleUserWorker: async (root, args, contextValue) => {
			contextCheck(contextValue.authUser, 2);

			const user = await User.findById(args.userId);
			user.rank.worker = !user.rank.worker;
			return user.save();
		},

		toggleUserAdmin: async (root, args, contextValue) => {
			contextCheck(contextValue.authUser, 2);

			const user = await User.findById(args.userId);
			user.rank.admin = !user.rank.admin;
			return user.save();
		},
	},
};
