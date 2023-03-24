const nodeMailer = require("nodemailer")
const { google } = require("googleapis")
require("dotenv").config()
const messageCreator = require("./messageCreator")

function auth() {
    const OAuth2 = google.auth.OAuth2

    const OAuth2_client = new OAuth2(
        process.env.EMAIL_CLIENTID,
        process.env.EMAIL_SECRET
    )

    OAuth2_client.setCredentials({ refresh_token: process.env.EMAIL_REFRESHTOKEN })

    const accessToken = OAuth2_client.getAccessToken()

    return nodeMailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: process.env.EMAIL_SENDER,
            clientId: process.env.EMAIL_CLIENTID,
            clientSecret: process.env.EMAIL_SECRET,
            refreshToken: process.env.EMAIL_REFRESHTOKEN,
            accessToken: accessToken
        }
    })
}

async function main(receiverEmail, area, type) {
    const transporter = auth()

    let subject

    switch (type) {
        case 0:
            subject = "Olet pyytänyt aluetta"
            break
        case 1:
            subject = "Pyytämäsi alue on nyt sinulle jaossa"
            break
        case 2:
            subject = "Sinulle jaettu alue on nyt palautettu"
            break
        case 3:
            subject = "Test mail"
            break
        default:
            return
    }
    
    const html = messageCreator(area, subject)

    const info = transporter.sendMail({
        from: "Alueet - jako huomautus <" + process.env.EMAIL_SENDER + ">",
        to: receiverEmail,
        subject: subject,
        html: html
    })

    transporter.close()
}

module.exports = main