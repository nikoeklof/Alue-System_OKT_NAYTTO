const nodemailer = require("nodemailer")
const { google } = require("googleapis")
require("dotenv").config()
const messageCreator = require("./messageCreator")

// For Google accounts

function googleAuth() {
    const OAuth2 = google.auth.OAuth2

    const OAuth2_client = new OAuth2(
        process.env.EMAIL_CLIENTID,
        process.env.EMAIL_SECRET
    )

    OAuth2_client.setCredentials({ refresh_token: process.env.EMAIL_REFRESHTOKEN })

    const accessToken = OAuth2_client.getAccessToken()

    return nodemailer.createTransport({
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

// For fake emails, check "Preview Url" in console once sent

async function createTestAccount() {
    let testAccount = await nodemailer.createTestAccount()

    return nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass,
        },
    })
}

async function main(receiverEmail, incomingValues, subject) {
    let transporter

    if (process.env.USE_GMAIL === "1")
        transporter = googleAuth()
    else
        transporter = await createTestAccount()

    const html = messageCreator(incomingValues, subject)

    let info = await transporter.sendMail({
        from: "Alueet - jako huomautus <AlueetTuki@mail.com>",
        to: receiverEmail,
        subject: subject,
        html: html
    })

    console.log("Preview URL: ", nodemailer.getTestMessageUrl(info));

    transporter.close()
}

module.exports = main