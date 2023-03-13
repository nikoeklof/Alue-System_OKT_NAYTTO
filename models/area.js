const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    cordinates: {
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
        required: true,
    },
    buildings: {
        type: Number,
        required: true,
    },
    info: {
        type: String,
    },
    shared: {
        isTrue: {
            type: Boolean,
            required: true,
        },
        ownerId: {
            type: String,
        },
        shareDate: {
            type: String,
        }
    }
})

module.exports = mongoose.model("Area", schema)