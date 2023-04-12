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
        default: false
    }
})

module.exports = mongoose.model("User", schema)