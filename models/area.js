const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    info: {
        type: {
            type: String,
            required: true
        },
        cityName: {
            type: String,
            required: true
        },
        quarter: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        buildings: {
            type: Number,
            required: true
        },
        homes: {
            type: Number,
            required: true
        },
        map: {
            coordinates: {
                lan: {
                    type: String,
                    required: true,
                },
                lon: {
                    type: String,
                    required: true,
                }
            },
            zone: {
                type: String,
                required: true
            }
        },
        misc: {
            type: String,
            default: null
        }
    },
    shareState: {
        isShared: {
            type: Boolean,
            default: false
        },
        shareRequests: {
            type: [mongoose.Types.ObjectId],
            default: []
        },
        sharedTo: {
            type: mongoose.Types.ObjectId,
            default: null
        },
        sharedBy: {
            type: mongoose.Types.ObjectId,
            default: null
        },
        shareStartDate: {
            type: Date,
            default: null
        }
    },
    shareHistory: {
        type: [
            {
                sharedTo: {
                    type: mongoose.Types.ObjectId,
                    required: true
                },
                sharedBy: {
                    type: mongoose.Types.ObjectId,
                    required: true
                },
                shareStartDate: {
                    type: Date,
                    required: true
                },
                shareEndDate: {
                    type: Date,
                    required: true
                }
            }
        ],
        default: [],
        _id: false
    }
})

module.exports = mongoose.model("Area", schema)