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

            const guest = Guest.findById(args.guestId)

            if (!guest)
                throw new UserInputError("Guest not found")

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

        toggleUserDisabled: (root, args) => {
            const user = User.findById(args.userId)

            user.disabled = !user.disabled

            return user.save()
                .catch(error => {
                    throw new UserInputError(error.message, {
                        invalidArgs: args,
                    })
                })
        },

        createArea: (root, args) => {
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

        editArea: async (root, args) => { //Pystyykö tekee paremmin?
            const area = await Area.findById(args.areaId)

            if (!area)
                throw new UserInputError("Area not found")

            if (args.type)
                area.info.type = args.type

            if (args.cityName)
                area.info.cityName = args.cityName

            if (args.quarter)
                area.info.quarter = args.quarter

            if (args.address)
                area.info.address = args.address

            if (args.buildings)
                area.info.buildings = args.buildings

            if (args.homes)
                area.info.homes = args.homes

            if (args.lan)
                area.info.map.coordinates.lan = args.lan

            if (args.lon)
                area.info.map.coordinates.lon = args.lon

            if (args.zone)
                area.info.map.zone = args.zone

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
                throw new UserInputError("User not found")

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
        },

        makeRequest: async (root, args) => {
            const requestee = await Guest.findOne({ email: args.guestEmail })

            if (!requestee)
                throw new AuthenticationError("Email not found")

            const requestedArea = await Area.updateOne({ _id: args.areaId }, { $push: { "shareState.shareRequests": requestee._id } })

            if (!requestedArea)
                throw new AuthenticationError("Area not found")

            return "Request succesful"
        },

        allowAreaRequest: async (root, args) => {
            /*
            const contextUser = context.user

            console.log(contextUser)

            if (!contextUser)
                throw new GraphQLError("Not authenticated", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                    }
                })
            */

            const area = await Area.findById(args.areaId)

            let requestedArea

            if (!area.shareState.shareRequests.includes(args.guestId))
                requestedArea = await Area.updateOne({ _id: args.areaId },
                    { $set: { "shareState.sharedTo": args.guestId } },
                    { $set: { "shareState.sharedBy": "1" } })
            else
                requestedArea = await Area.updateOne({ _id: args.areaId },
                    { $pull: { "shareState.shareRequests": args.guestId } },
                    { $set: { "shareState.sharedTo": args.guestId } },
                    { $set: { "shareState.sharedBy": "1" } })

            return "Area approved"
        },
    }
}

module.exports = resolvers