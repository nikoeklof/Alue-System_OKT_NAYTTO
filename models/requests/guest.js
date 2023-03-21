const mongoose = require("mongoose")
require("dotenv").config()

const url = process.env.MONGODB_URI

mongoose.set("strictQuery", false)

mongoose.connect(url).then(() => {
    console.log("Connected to MongoDB")
}).catch((error) => {
    console.log("Error connection to MongoDB:", error.message)
})

const Guest = require("../guest")

const guest = new Guest({
    email: "HHM@mail.net",
    name: "Howard Hamlin"
})

guest.save().then(result => {
    console.log("Guest saved Succesfully")
    mongoose.connection.close()
})