const { UserInputError } = require("apollo-server")

const Area = require("../../models/area")
const Guest = require("../../models/guest")

const contextCheck = require("../../util/contextCheck")
const mailer = require("../../util/mail")

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
                newArgs["info.address"] = args.address

            if ("isShared" in args)
                newArgs["shareState.isShared"] = args.isShared

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

        deleteArea: async (root, args, contextValue) => {
            contextCheck(contextValue.authUser, true)

            return await Area.findByIdAndDelete(args.areaId)
                .catch(error => {
                    throw new UserInputError(error.message, {
                        invalidArgs: args,
                    })
                })
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
        }
    }
}