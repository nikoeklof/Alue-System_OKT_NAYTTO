const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    info: {
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
        latlngs: {
            type: [
                {
                    lat: {
                        type: String,
                        required: true
                    },
                    lng: {
                        type: String,
                        required: true
                    }
                }
            ],
            default: [],
            _id: false
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
            type: [mongoose.Schema.Types.ObjectId],
            default: []
        },
        sharedTo: {
            type: mongoose.Schema.Types.ObjectId,
            default: null
        },
        sharedBy: {
            type: mongoose.Schema.Types.ObjectId,
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
                    type: mongoose.Schema.Types.ObjectId,
                    required: true
                },
                sharedBy: {
                    type: mongoose.Schema.Types.ObjectId,
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