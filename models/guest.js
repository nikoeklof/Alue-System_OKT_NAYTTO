const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    areas: {
        type: Array,
        default: []
    }
})

module.exports = mongoose.model("Guest", schema)