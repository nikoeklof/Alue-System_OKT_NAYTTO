const mongoose = require("mongoose")
require('dotenv').config()

const url = process.env.MONGODB_URI

mongoose.set("strictQuery", false)

mongoose.connect(url).then(() => {
    console.log("Connected to MongoDB")
}).catch((error) => {
    console.log("Error connection to MongoDB:", error.message)
})

const Area = require("../area")

const area = new Area({
    info: {
        type: "Kaupunki",
        cityName: "Mikkeli",
        quarter: "Kaukola",
        address: "katu 3",
        buildings: 10,
        homes: 1,
        map: {
            coordinates: {
                lan: "23.324",
                lon: "1.123"
            },
            zone: "103 192 480 183"
        },
        misc: "Kaukolan ympäröivä alue"
    }
})

area.save().then(result => {
    console.log("Area saved Succesfully")
    mongoose.connection.close()
})