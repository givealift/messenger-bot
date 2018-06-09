# GiveALift Bot for Messenger

This is a special service connecting Givealift with Messenger platform.

## How it works?

Bot exposes special endpoint `POST /webhook` for Messenger Platform. All messeges that users send to Givelift using Messenger are passed to this endpoint. Bot handles diffrent types of messages, parses them and finally replies to the recipient using Messenger Send API.
Bot listens for any notification from Givealift API on `POST /notify` webhook and broadcast it as a message on Messenger chat.

## How to run?

* ensure you have node.js installed
* clone the repository
* `$ npm install` to install all dependencies
* `$ ts-node src/app.ts` to run server or `$ npm nodemon` to run in live-reload mode

![givealift architecture](https://i.imgur.com/72Sdo3t.png)
