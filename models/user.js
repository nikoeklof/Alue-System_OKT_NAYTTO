const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    guestId: {
        type: mongoose.Types.ObjectId,
        required: true,
        unique: true
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
        default: true
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