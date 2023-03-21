const nodeMailer = require("nodemailer")
const { google } = require("googleapis")
require("dotenv").config()

const OAuth2 = google.auth.OAuth2

const OAuth2_client = new OAuth2(
    process.env.EMAIL_CLIENTID,
    process.env.EMAIL_SECRET
)

OAuth2_client.setCredentials({ refresh_token: process.env.EMAIL_REFRESHTOKEN })

const html = "<h1>xd</h1><p>lol</p>"
const receiverEmail = process.env.EMAIL_RECEIVER_TEST

async function main(receiverEmail) {
    const accessToken = OAuth2_client.getAccessToken()

    const transporter = nodeMailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: process.env.EMAIL_SENDER_TEST,
            clientId: process.env.EMAIL_CLIENTID,
            clientSecret: process.env.EMAIL_SECRET,
            refreshToken: process.env.EMAIL_REFRESHTOKEN,
            accessToken: accessToken
        }
    })

    const info = await transporter.sendMail({
        from: "Walter Hartwell White <" + process.env.EMAIL_SENTER_TEST + ">",
        to: receiverEmail,
        subject: "roflmao",
        html: html,
        text: "xd"
    })

    console.log("Message sent:", info.messageId)
    transporter.close()
}

main(receiverEmail)
    .catch(e => console.log(e))

//module.exports = main