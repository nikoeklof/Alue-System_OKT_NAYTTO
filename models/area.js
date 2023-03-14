const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    info: {
        type: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true,
        },
        quarter: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        asuntoja: {
            type: Number,
            required: true
        },
        omakotitaloja: {
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
                type: String
            }
        },
        misc: {
            type: String,
        }
    },
    state: {
        lainattu: {
            type: Boolean,
            required: true
        },
        lainaaja: {
            type: String,
            required: true
        },
        jaettu: {
            type: Array
        }
    },
    date: {
        lainattu: {
            type: String
        },
        palautettu: {
            type: String
        }
    }
})

module.exports = mongoose.model("Area", schema)