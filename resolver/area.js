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

            const areas = await Area.find(newArgs)

            if ("hasRequests" in args && args.hasRequests === true)
                for (let x = 0; x < areas.length; x++)
                    if (areas[x].shareState.shareRequests.length < 1)
                        areas.splice(x, 1)

            return areas
        },
    },

    Area: {
        info: (root) => root.info,
        shareState: async (root) => {
            const sharedTo = await User.findById(root.shareState.sharedTo)
            const sharedBy = await User.findById(root.shareState.sharedBy)

            const requestsArray = []
            for (let x = 0; x < root.shareState.shareRequests.length; x++) {
                const user = await User.findById(root.shareState.shareRequests[x])
                requestsArray.push(user.email)
            }

            return {
                ...root.shareState,
                sharedBy: sharedBy.email,
                sharedTo: sharedTo.email,
                shareRequests: requestsArray,
            }
        },
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

            if (area.shareState.shareRequests.includes(user._id))
                throw new UserInputError("You have already reguested this area")

            if (area.shareState.sharedTo == user._id)
                throw new UserInputError("Area is already being shared to you")

            area.shareState.shareRequests.push(user._id)

            area.save()

            mailer(user.email, area.info, "Olet pyytänyt aluetta")

            return area
        },

        removeRequest: async (root, args, contextValue) => {
            const user = contextCheck(contextValue.authUser, 0)

            const area = await Area.findById(args.areaId)

            if (!area)
                throw new UserInputError("Area not found")

            if (!area.shareState.shareRequests.includes(user._id))
                throw new UserInputError("You have not requested this area")

            area.shareState.shareRequests.splice(area.shareState.shareRequests.indexOf(user._id), 1)

            return area.save()
        },

        removeRequestAsAdmin: async (root, args, contextValue) => {
            contextCheck(contextValue.authUser, 1)

            const area = await Area.findById(args.areaId)

            if (!area)
                throw new UserInputError("Area not found")

            const user = await User.findOne({ email: args.email })

            if (!user)
                throw new UserInputError("User not found")

            if (!area.shareState.shareRequests.includes(user._id))
                throw new UserInputError("This has not been requested by: " + args.email)

            area.shareState.shareRequests.splice(area.shareState.shareRequests.indexOf(user._id), 1)

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

            if (area.shareState.shareRequests.includes(user._id))
                area.shareState.shareRequests.splice(area.shareState.shareRequests.indexOf(user._id), 1)

            area.shareState.isShared = true
            area.shareState.sharedBy = authUser._id
            area.shareState.sharedTo = user._id
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

            const user = await User.findById(shareEnd.sharedTo)

            mailer(user.email, area.info, "Sinulle jaettu alue on nyt palautettu")

            return area
        }
    }
}