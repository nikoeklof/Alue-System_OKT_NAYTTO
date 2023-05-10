## Table of contents
* [General info](#general-info)
* [Setup](#setup)

## General info
This project is the backend of Frontend-Main.

## Setup
To run this project, install it locally using npm:

```
$ cd {File directory}
$ npm install
```

You need to setup your personalized environmental values into an .env file that is within this file. Same as README.md.
Check the [Required envs](#required-envs) below. Once set you can start the backend

```
$ npm start
```

## Required envs

MONGODB_URI - Your Mongo Database link

JWT_SECRET - A string of your choosing, used for authorization key creation during login

## Optional envs

PORT - By default this is 3001

### For emails (Using Gmail):

USE_GMAIL - "1" to use GMAIL as email transporter, will otherwise send fake emails to experiment with if unused

Use_GMAIL requires the following values:

EMAIL_SENDER - Google account used to send the mail, preferably don´t use a personal account

EMAIL_CLIENTID

EMAIL_SECRET

EMAIL_REFRESHTOKEN

### For logging:

LOGGING - "1" will log all requests, variables included
