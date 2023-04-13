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
            type: [String],
            default: []
        },
        sharedTo: {
            type: String,
            default: null
        },
        sharedBy: {
            type: String,
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
                    type: String,
                    required: true
                },
                sharedBy: {
                    type: String,
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