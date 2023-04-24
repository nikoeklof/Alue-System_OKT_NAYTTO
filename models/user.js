const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    guestAccount: {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    },
    rank: {
        type: [String],
        default: null
    },
    aboutMe: {
        type: String,
        default: null
    }
})

module.exports = mongoose.model("User", schema)