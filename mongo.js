const mongoose = require("mongoose")
require('dotenv').config()

const url = process.env.MONGODB_URI

mongoose.set("strictQuery", false)

mongoose.connect(url).then(() => {
    console.log("Connected to MongoDB")
}).catch((error) => {
    console.log("Error connection to MongoDB:", error.message)
})

const Owner = require("./models/owner")
const Area = require("./models/area")

const owner = new Owner({
    name: "Mr. X",
    email: "X@isComingForYou.com",
})

const area = new Area({
    name: "Pohjoinen",
    cordinates: { lan: "0", lon: "0" },
    zone: "NorthPole",
    buildings: 1,
    info: "info",
    shared: {
        isTrue: false,
        ownerId: null,
        shareDate: null
    }
})


owner.save().then(result => {
    area.save().then(result => {
        console.log("Owner and Area saved Succesfully")
        mongoose.connection.close()
    })
})