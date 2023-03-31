const { UserInputError, AuthenticationError } = require("apollo-server")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const Area = require("./models/area")
const Guest = require("./models/guest")
const User = require("./models/user")

const mailer = require("./util/mail")

const contextCheck = (user, hasToBeAdmin) => {
    if (!user)
        throw new AuthenticationError("Not authenticated")

    if (hasToBeAdmin && !user.admin)
        throw new AuthenticationError("User has to be admin")

    return user
}

const resolvers = {
    Query: {
        areaCount: () => Area.collection.countDocuments(),
        guestCount: () => Guest.collection.countDocuments(),
        userCount: () => User.collection.countDocuments(),
        allGuests: async () => await Guest.find({}),
        allAreas: async (root, args) => {

            if (Object.keys(args).length === 0)
                return await Area.find({})

            let newArgs = {}

            if ("type" in args)
                newArgs["info.type"] = args.type

            if ("cityName" in args)
                newArgs["info.cityName"] = args.cityName

            if ("quarter" in args)
                newArgs["info.quarter"] = args.quarter

            if ("address" in args)
                newArgs["info.address"] = args.address

            if ("isShared" in args)
                newArgs["shareState.isShared"] = args.isShared

            return await Area.find(newArgs)
        },
        allUsers: async (root, args) => await User.find(args),
        me: (root, args, contextValue) => contextValue.authUser
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
        disabled: (root) => {
            return root.disabled
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

        createUser: async (root, args) => {
            if (args.username.length < 3)
                throw new UserInputError("Username must have at least minimum 3 letters")

            if (args.password.length < 5)
                throw new UserInputError("Password must have at least minimum 5 letters")

            const guest = await Guest.findById(args.guestId)

            if (!guest)
                throw new UserInputError("Guest not found")

            const user = new User({
                ...args,
                password: await bcrypt.hash(args.password, 10)
            })

            return user.save()
                .catch(error => {
                    throw new UserInputError(error.message, {
                        invalidArgs: args,
                    })
                })
        },

        toggleUserDisabled: async (root, args, contextValue) => {
            contextCheck(contextValue.authUser, true)

            const user = await User.findById(args.userId)
            user.disabled = !user.disabled
            return user.save()
        },

        toggleUserAdmin: async (root, args, contextValue) => {
            contextCheck(contextValue.authUser, false)

            const user = await User.findById(args.userId)
            user.admin = !user.admin
            return user.save()
        },

        createArea: (root, args, contextValue) => {
            contextCheck(contextValue.authUser, true)

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

        deleteArea: async (root, args, contextValue) => {
            contextCheck(contextValue.authUser, true)

            return await Area.findByIdAndDelete(args.areaId)
                .catch(error => {
                    throw new UserInputError(error.message, {
                        invalidArgs: args,
                    })
                })
        },

        editArea: async (root, args, contextValue) => {
            contextCheck(contextValue.authUser, true)

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

        editUser: async (root, args, contextValue) => {
            const user = contextCheck(contextValue.authUser, false)

            if (args.username)
                if (args.username.length < 3)
                    throw new UserInputError("Username must have at least minimum 3 letters")
                else
                    user.username = args.username

            if (args.password)
                if (args.password.length < 5)
                    throw new UserInputError("Password must have at least minimum 5 letters")
                else
                    user.password = await bcrypt.hash(args.password, 10)

            return user.save()
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
        },

        makeRequest: async (root, args) => {
            const guest = await Guest.findOne({ email: args.guestEmail })

            if (!guest)
                throw new UserInputError("Guest not found")

            const area = await Area.findById(args.areaId)

            if (!area)
                throw new UserInputError("Area not found")

            if (area.shareState.shareRequests.includes(guest._id))
                throw new UserInputError("You have already reguested this area")

            if (area.shareState.sharedTo == guest._id)
                throw new UserInputError("Area is already being shared to you")

            area.shareState.shareRequests.push(guest._id)

            area.save()

            mailer(guest.email, area.info, 0)

            return area
        },

        allowAreaRequest: async (root, args, contextValue) => {
            contextCheck(contextValue.authUser, false)

            const guest = await Guest.findById(args.guestId)

            if (!guest)
                throw new UserInputError("Guest not found")

            const area = await Area.findById(args.areaId)

            if (!area)
                throw new UserInputError("Area not found")

            if (area.shareState.isShared == true)
                throw new UserInputError("Area is currently being shared")

            if (area.shareState.shareRequests.includes(args.guestId))
                area.shareState.shareRequests.splice(area.shareState.shareRequests.indexOf(args.guestId), 1)

            area.shareState.isShared = true
            area.shareState.sharedBy = authUser.id
            area.shareState.sharedTo = args.guestId
            area.shareState.shareStartDate = new Date().toJSON()

            area.save()
                .catch(error => {
                    throw new UserInputError(error.message, {
                        invalidArgs: args,
                    })
                })

            mailer(guest.email, area.info, 1)

            return area
        },

        returnSharedArea: async (root, args, contextValue) => {
            contextCheck(contextValue.authUser, false)

            const area = await Area.findById(args.areaId)

            if (!area)
                throw new UserInputError("Area not found")

            if (area.shareState.isShared == false)
                throw new UserInputError("Area is not currently being shared")

            const shareEnd = {
                sharedTo: area.shareState.sharedTo,
                sharedBy: area.shareState.sharedBy,
                shareStartDate: area.shareState.shareStartDate,
                shareEndDate: new Date().toJSON()
            }

            area.shareHistory.push(shareEnd)

            area.shareState = {
                isShared: false,
                sharedBy: null,
                sharedTo: null,
                shareStartDate: null
            }

            area.save()
                .catch(error => {
                    throw new UserInputError(error.message, {
                        invalidArgs: args,
                    })
                })

            const guest = await Guest.findById(shareEnd.sharedTo)

            mailer(guest.email, area.info, 2)

            return area
        },

        sendTestMail: async (root, args) => {
            const area = {
                info: {
                    type: "Kaupunki",
                    cityName: "Mikkeli",
                    quarter: "Kaukola",
                    address: "katu 3",
                    buildings: 10,
                    homes: 1,
                    map: {
                        coordinates: {
                            lan: "23.324",
                            lon: "1.123"
                        },
                        zone: "103 192 480 183"
                    },
                    misc: "Kaukolan ympäröivä alue"
                }
            }

            mailer(args.email, area.info, 3)
            return true
        },
    }
}

module.exports = resolvers