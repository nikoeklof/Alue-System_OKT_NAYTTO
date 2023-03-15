const { UserInputError, AuthenticationError } = require("apollo-server")
const bcrypt = require("bcrypt")

const Area = require("./models/area")
const Guest = require("./models/guest")
const User = require("./models/user")

const resolvers = {
    Query: {
        areaCount: () => Area.collection.countDocuments(),
        guestCount: () => Guest.collection.countDocuments(),
        userCount: () => User.collection.countDocuments(),
        allGuests: async () => await Guest.find({}),
        allAreas: async () => await Area.find({}),
        allUsers: async () => await User.find({}),
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
        admin: (root) => {
            return root.admin
        },
        guestAccount: async (root) => {
            return await Guest.findById(root.guestId)
        },
    },
    Area: {
        info: (root) => {
            return root.info
        },
        shareState: (root) => {
            return root.shareState
        },
        shareHistory: (root) => {
            return root.shareHistory
        }
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
        createUser: (root, args) => {
            bcrypt.hash(args.password, 10, function (err, hash) {
                const user = new User({ ...args, password: hash })
                return user.save()
                    .catch(error => {
                        throw new UserInputError(error.message, {
                            invalidArgs: args,
                        })
                    })
            });
        },
        login: async (root, args) => {
            const user = await User.find({ username: args.username })

            if (user.disabled) {
                throw new AuthenticationError("User account is disabled")
            }

            bcrypt.compare(args.password, user.password, function (err, result) {
                if (result)
                    return { value: "token" }
            });
        }
    }
}

module.exports = resolvers