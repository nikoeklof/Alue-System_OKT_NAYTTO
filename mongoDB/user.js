const mongoose = require("mongoose")
require("dotenv").config()
const bcrypt = require("bcrypt")

const url = process.env.MONGODB_URI

mongoose.set("strictQuery", false)

mongoose.connect(url).then(() => {
    console.log("Connected to MongoDB")
}).catch((error) => {
    console.log("Error connection to MongoDB:", error.message)
})

const User = require("../models/user")

bcrypt.hash("HHM", 10, function (err, hash) {
    const user = new User({
        username: "Howard Hamlin",
        password: hash,
        guestId: "641174145ca33dfd80f06ebe", // tämä ID saa kun tekee guestin
        admin: true
    })

    user.save().then(result => {
        console.log("User saved Succesfully")
        mongoose.connection.close()
    })
})