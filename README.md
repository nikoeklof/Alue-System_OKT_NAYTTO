Requires envs:

MONGODB_URI - Your mongoDB link
JWT_SECRET - A string of your choosing, used for authorization key creation
PORT - Optional, by default it is 3001

For emails (Using Gmail):

USE_GMAIL - "1" to use GMAIL as email transporter, requires the following values

EMAIL_SENDER - Google account used to send the mail
EMAIL_CLIENTID
EMAIL_SECRET
EMAIL_REFRESHTOKEN

For logging:

LOGGING - "1" will log all requests, variables included
