const { UserInputError, AuthenticationError } = require('apollo-server');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Guest = require('../models/guest');
const User = require('../models/user');
const contextCheck = require('../util/contextCheck');

module.exports = {
	Query: {
		userCount: () => User.collection.countDocuments(),
		allUsers: async (root, args) => await User.find({ ...args }),
		me: (root, args, contextValue) => contextValue.authUser,
	},

	User: {
		admin: (root) => root.admin,
		disabled: (root) => root.disabled,
		guestAccount: async (root) => await Guest.findById(root.guestAccount._id),
	},

	Mutation: {
		login: async (root, args) => {
			const user = await User.findOne({ 'guestAccount.email': args.email })

			if (!user) throw new AuthenticationError('User not found');

			if (user.disabled)
				throw new AuthenticationError('User account is disabled');

			if (!(await bcrypt.compare(args.password, user.password)))
				throw new AuthenticationError('Invalid password');

			const userForToken = {
				email: user.guestAccount.email,
				id: user._id
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

			if (await User.findOne({ 'guestAccount._id': guest._id }))
				throw new UserInputError('An user account is already connected to this email');

			const user = new User({
				guestAccount: {
					_id: guest._id,
					email: guest.email
				},
				password: await bcrypt.hash(args.password, 10)
			});

			return user.save().catch((error) => {
				throw new UserInputError(error.message, {
					invalidArgs: args,
				});
			});
		},

		deleteUser: async (root, args) => {
			if (args.userId)
				return await User.findByIdAndDelete(args.userId)

			if (args.email)
				return await User.findOneAndDelete({ 'guestAccount.email': args.email })

			if (args.guestId)
				return await User.findOneAndDelete({ 'guestAccount.id': args.guestId })

			throw new UserInputError('At least 1 argument is required')
		},

		changeUserPassword: async (root, args, contextValue) => {
			const user = contextCheck(contextValue.authUser, false)

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

		toggleUserDisabled: async (root, args, contextValue) => {
			contextCheck(contextValue.authUser, true);

			const user = await User.findById(args.userId);
			user.disabled = !user.disabled;
			return user.save();
		},

		toggleUserAdmin: async (root, args, contextValue) => {
			contextCheck(contextValue.authUser, false);

			const user = await User.findById(args.userId);
			user.admin = !user.admin;
			return user.save();
		},
	},
};
