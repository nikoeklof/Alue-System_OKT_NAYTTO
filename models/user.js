const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    rank: {
        admin: {
            type: Boolean,
            default: false
        },
        worker: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
    },
    aboutMe: {
        type: String,
        default: null
    }
})

module.exports = mongoose.model("User", schema)