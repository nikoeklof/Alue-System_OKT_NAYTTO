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
            const newArgs = {}

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
        email: (root) => root.email,
        areas: async (root) => await Area.find({ ["shareState.sharedTo"]: root.email })

    },

    User: {
        admin: (root) => root.admin,
        disabled: (root) => root.disabled,
        guestAccount: async (root) => await Guest.findById(root.guestId),
    },

    Area: {
        info: (root) => root.info,
        shareState: (root) => root.shareState,
        shareHistory: (root) => root.shareHistory
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
            if (args.password.length < 5)
                throw new UserInputError("Password must have at least minimum 5 letters")

            const guest = await Guest.findOne({ email: args.email })

            if (!guest)
                throw new UserInputError("Invalid email, guest not found")

            const user = new User({
                guestId: guest._id,
                password: await bcrypt.hash(args.password, 10)
            })

            return user.save()
                .catch(error => {
                    throw new UserInputError(error.message, {
                        invalidArgs: args,
                    })
                })
        },

        /*
            [
            {"lat": "21,9899898", "lng": "69,28178148"},
            {"lat": "21,9899898", "lng": "69,28178148"},
            {"lat": "21,9899898", "lng": "69,28178148"}
            ]
        */

        createArea: (root, args, contextValue) => {
            //contextCheck(contextValue.authUser, true)

            const area = new Area({
                info: {
                    ...args
                }
            })

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

            area.info = { ...area.info, ...args }

            return area.save()
                .catch(error => {
                    throw new UserInputError(error.message, {
                        invalidArgs: args,
                    })
                })
        },

        changeUserPassword: async (root, args, contextValue) => {
            const user = contextCheck(contextValue.authUser, false)

            if (args.password.length < 5)
                throw new UserInputError("Password must have at least minimum 5 letters")

            user.password = await bcrypt.hash(args.password, 10)

            return user.save()
                .catch(error => {
                    throw new UserInputError(error.message, {
                        invalidArgs: args,
                    })
                })
        },

        login: async (root, args) => {
            const guest = await Guest.findOne({ email: args.email })

            if (!guest)
                throw new UserInputError("Invalid email")

            const user = await User.findOne({ guestId: guest._id })

            if (!user)
                throw new AuthenticationError("User not found")

            if (user.disabled)
                throw new AuthenticationError("User account is disabled")

            if (!await bcrypt.compare(args.password, user.password))
                throw new AuthenticationError("Invalid password")

            const userForToken = {
                email: guest.email,
                id: user._id
            }

            return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
        },

        makeRequest: async (root, args) => {
            const guest = await Guest.findOne({ email: args.email })

            if (!guest)
                throw new UserInputError("Guest not found")

            const area = await Area.findById(args.areaId)

            if (!area)
                throw new UserInputError("Area not found")

            if (area.shareState.shareRequests.includes(guest.email))
                throw new UserInputError("You have already reguested this area")

            if (area.shareState.sharedTo == guest.email)
                throw new UserInputError("Area is already being shared to you")

            area.shareState.shareRequests.push(guest.email)

            area.save()

            //mailer(guest.email, area.info, 0)

            return area
        },

        allowAreaRequest: async (root, args, contextValue) => {
            contextCheck(contextValue.authUser, false)

            const guest = await Guest.findOne({ email: args.email })

            if (!guest)
                throw new UserInputError("Guest not found")

            const area = await Area.findById(args.areaId)

            if (!area)
                throw new UserInputError("Area not found")

            if (area.shareState.isShared == true)
                throw new UserInputError("Area is currently being shared")

            if (area.shareState.shareRequests.includes(guest.email))
                area.shareState.shareRequests.splice(area.shareState.shareRequests.indexOf(guest.email), 1)

            const authGuest = await Guest.findById(contextValue.authUser.guestId)

            area.shareState.isShared = true
            area.shareState.sharedBy = authGuest.email
            area.shareState.sharedTo = guest.email
            area.shareState.shareStartDate = new Date()

            area.save()
                .catch(error => {
                    throw new UserInputError(error.message, {
                        invalidArgs: args,
                    })
                })

            //mailer(guest.email, area.info, 1)

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
                shareEndDate: new Date()
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

            const guest = await Guest.findOne({ email: shareEnd.sharedTo })

            //mailer(guest.email, area.info, 2)

            return area
        },
    }
}

module.exports = resolvers