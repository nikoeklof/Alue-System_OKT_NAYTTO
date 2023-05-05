const { UserInputError } = require("apollo-server")

const Area = require("../models/area")
const User = require("../models/user")

const contextCheck = require("../util/contextCheck")
const mailer = require("../util/mail")

module.exports = {
    Query: {
        areaCount: () => Area.collection.countDocuments(),
        allAreas: async (root, args) => {
            const newArgs = {}

            if ("cityName" in args)
                newArgs["info.cityName"] = args.cityName

            if ("quarter" in args)
                newArgs["info.quarter"] = args.quarter

            if ("address" in args)
                newArgs["info.address"] = { $regex: args.address }

            if ("isShared" in args)
                newArgs["shareState.isShared"] = args.isShared

            if ("requesteeEmail" in args)
                newArgs["shareState.shareRequests"] = { $regex: args.requesteeEmail }

            return await Area.find(newArgs)
        },
    },

    Area: {
        info: (root) => root.info,
        shareState: (root) => root.shareState,
        shareHistory: (root) => root.shareHistory
    },

    Mutation: {
        createArea: (root, args, contextValue) => {
            //contextCheck(contextValue.authUser, 2)

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

        editArea: async (root, args, contextValue) => {
            contextCheck(contextValue.authUser, 2)

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

        deleteArea: async (root, args, contextValue) => {
            contextCheck(contextValue.authUser, 2)

            return await Area.findByIdAndDelete(args.areaId)
                .catch(error => {
                    throw new UserInputError(error.message, {
                        invalidArgs: args,
                    })
                })
        },

        makeRequest: async (root, args, contextValue) => {
            const user = contextCheck(contextValue.authUser, 0)

            const area = await Area.findById(args.areaId)

            if (!area)
                throw new UserInputError("Area not found")

            if (area.shareState.shareRequests.includes(user.email))
                throw new UserInputError("You have already reguested this area")

            if (area.shareState.sharedTo == user.email)
                throw new UserInputError("Area is already being shared to you")

            area.shareState.shareRequests.push(user.email)

            area.save()

            mailer(user.email, area.info, "Olet pyytänyt aluetta")

            return area
        },

        removeRequest: async (root, args, contextValue) => {
            const user = contextCheck(contextValue.authUser, 0)

            const area = await Area.findById(args.areaId)

            if (!area)
                throw new UserInputError("Area not found")

            if (!area.shareState.shareRequests.includes(user.email))
                throw new UserInputError("You have not requested this area")

            area.shareState.shareRequests.splice(area.shareState.shareRequests.indexOf(user.email), 1)

            return area.save()
        },

        allowAreaRequest: async (root, args, contextValue) => {
            const authUser = contextCheck(contextValue.authUser, 1)

            const user = await User.findOne({ email: args.email })

            if (!user)
                throw new UserInputError("User not found")

            const area = await Area.findById(args.areaId)

            if (!area)
                throw new UserInputError("Area not found")

            if (area.shareState.isShared == true)
                throw new UserInputError("Area is currently being shared")

            if (area.shareState.shareRequests.includes(user.email))
                area.shareState.shareRequests.splice(area.shareState.shareRequests.indexOf(user.email), 1)

            area.shareState.isShared = true
            area.shareState.sharedBy = authUser.email
            area.shareState.sharedTo = user.email
            area.shareState.shareStartDate = new Date()

            area.save()
                .catch(error => {
                    throw new UserInputError(error.message, {
                        invalidArgs: args,
                    })
                })

            mailer(user.email, area.info, "Pyytämäsi alue on sinulle nyt jaossa")

            return area
        },

        returnSharedArea: async (root, args, contextValue) => {
            contextCheck(contextValue.authUser, 1)

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
                shareRequests: area.shareState.shareRequests,
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

            const user = await User.findOne({ email: shareEnd.sharedTo })

            mailer(user.email, area.info, "Sinulle jaettu alue on nyt palautettu")

            return area
        }
    }
}