const mongoose = require("mongoose")
require("dotenv").config()

const url = process.env.MONGODB_URI

mongoose.set("strictQuery", false)

mongoose.connect(url).then(() => {
    console.log("Connected to MongoDB")
}).catch((error) => {
    console.log("Error connection to MongoDB:", error.message)
})

const Quest = require("../models/guest")

const quest = new Quest({
    email: "HHM@mail.net",
    name: "Howard Hamlin"
})

quest.save().then(result => {
    console.log("Quest saved Succesfully")
    mongoose.connection.close()
})