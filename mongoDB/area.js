const mongoose = require("mongoose")
require('dotenv').config()

const url = process.env.MONGODB_URI

mongoose.set("strictQuery", false)

mongoose.connect(url).then(() => {
    console.log("Connected to MongoDB")
}).catch((error) => {
    console.log("Error connection to MongoDB:", error.message)
})

const Area = require("../models/area")

const area = new Area({
    info: {
        type: "Kaupunki",
        name: "Mikkeli",
        quarter: "Kaukola",
        address: "katu 3",
        asuntoja: 10,
        omakotitaloja: 1,
        map: {
            coordinates: {
                lan: "23.324",
                lon: "1.123"
            },
            zone: null
        },
        misc: "Kaukolan ympäröivä alue"
    },
    state: {
        lainattu: false,
        lainaaja: 1,
        jaettu: []
    },
    date: {
        lainattu: "4.3.2023",
        palautettu: null
    }
})

area.save().then(result => {
    console.log("Area saved Succesfully")
    mongoose.connection.close()
})