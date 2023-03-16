const { UserInputError, AuthenticationError } = require("apollo-server")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

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

        me: (root, args, context) => {
            return context.user
        }
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
            if (args.username.length < 3)
                throw new UserInputError("Username is too short! Must have at least minimum 3 letters")

            if (args.password.length < 5)
                throw new UserInputError("Password is too short Must have at least minimum 5 letters")

            var user = null

            bcrypt.hash(args.password, 10, function (err, hash) {
                user = new User({ ...args, password: hash })
            });

            return user.save()
                .catch(error => {
                    throw new UserInputError(error.message, {
                        invalidArgs: args,
                    })
                })
        },
        createArea: (root, args) => {
            /*
            const contextUser = context.user

            if (!contextUser) {
                throw new GraphQLError("Not authenticated", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                    }
                })
            }
            */

            const area = new Area({
                info: {
                    type: args.type,
                    cityName: args.cityName,
                    quarter: args.quarter,
                    address: args.address,
                    buildings: args.buildings,
                    homes: args.homes,
                    map: {
                        coordinates: {
                            lan: args.lan,
                            lon: args.lon
                        },
                        zone: args.zone
                    }
                }
            })

            if (args.misc)
                area.info.misc = args.misc

            return area.save()
                .catch(error => {
                    throw new UserInputError(error.message, {
                        invalidArgs: args,
                    })
                })
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })

            if (!user)
                throw new AuthenticationError("User not found")

            if (user.disabled)
                throw new AuthenticationError("User account is disabled")

            bcrypt.compare(args.password, user.password, function (err, result) {
                if (!result)
                    throw new AuthenticationError("Invalid password")
            });

            const userForToken = {
                username: user.username,
                id: user._id
            }

            return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
        }
    }
}

module.exports = resolvers