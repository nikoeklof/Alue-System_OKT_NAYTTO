const mongoose = require("mongoose")
require('dotenv').config()

const url = process.env.MONGODB_URI

mongoose.set("strictQuery", false)

mongoose.connect(url).then(() => {
    console.log("Connected to MongoDB")
}).catch((error) => {
    console.log("Error connection to MongoDB:", error.message)
})

const Owner = require("../models/owner")

const owner = new Owner({
    email: process.argv[2]
})

owner.save().then(result => {
    console.log("Owner saved Succesfully")
    mongoose.connection.close()
})