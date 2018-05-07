import express from "express";
import bodyParser from "body-parser";
import request from 'request';
import { handleVerification } from "./auth";
import { MessageHandler } from "./message-handler";

const PAGE_ACCESS_TOKEN = process.env.BOT_PAGE_ACCESS_TOKEN;
const PORT = process.env.PORT || 1337;

const app = express();
const handler: MessageHandler = new MessageHandler();

app.use(bodyParser.json());
app.listen(PORT, () => console.log(`webhook is listening on port ${PORT}`));


app.get('/webhook', (req, res) => {
    handleVerification(req, res)
});

app.post('/webhook', (req, res) => {

    let body = req.body;

    // Checks this is an event from a page subscription
    if (body.object === 'page') {
        // Iterates over each entry - there may be multiple if batched
        body.entry.forEach((entry: any) => {

            // Gets the message. entry.messaging is an array, but 
            // will only ever contain one message, so we get index 0
            let webhook_event = entry.messaging[0];
            console.log(webhook_event);

            // Get the sender PSID
            let sender_psid = webhook_event.sender.id;
            console.log('Sender PSID: ' + sender_psid);

            // Check if the event is a message or postback and
            // pass the event to the appropriate handler function
            if (webhook_event.message) {
                handler.handleMessage(sender_psid, webhook_event.message);
            } else if (webhook_event.postback) {
                handler.handlePostback(sender_psid, webhook_event.postback);
            }
        });

        // Returns a '200 OK' response to all requests
        res.status(200).send('EVENT_RECEIVED');
    } else {
        // Returns a '404 Not Found' if event is not from a page subscription
        res.sendStatus(404);
    }

});

// Handles messages events
function handleMessage(sender_psid: any, received_message: any) {
    let response;
    let text: string = received_message.text;
    // Checks if the message contains text
    if (text) {
        if (text == "pomoc") {
            response = getHelpMessage();
        } else if (text.startsWith("przejazd")) {
            let [przejazd, from, to] = text.split(" ");
            console.log("debug: ", przejazd, from, to);

            if (from && to) {
                response = {
                    "attachment": {
                        "type": "template",
                        "payload": {
                            "template_type": "generic",
                            "elements": [{
                                "title": `Wygląda na to, że szukasz przejazdu z ${from} do ${to}.`,
                                "subtitle": "Mam rację? :)",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "Tak!",
                                        "payload": JSON.stringify({ type: "search", value: "yes" }),
                                    },
                                    {
                                        "type": "postback",
                                        "title": "Nie!",
                                        "payload": JSON.stringify({ type: "search", value: "no" }),
                                    }
                                ],
                            }]
                        }
                    }
                }
            }

        } else {

            // Creates the payload for a basic text message, which
            // will be added to the body of our request to the Send API
            response = {
                "text": `Wybacz, ale dopiero się uczę i nie rozumiem co znaczy "${received_message.text}" :(. Wpisz "pomoc" aby zobaczyć na co znam odpowiedź!`
            }
        }

    }
    // Sends the response message
    callSendAPI(sender_psid, response);
}

function getHelpMessage() {
    let description;
    description = `Aby wyszukać przejazdu wpisz 'przejazd START KONIEC', gdzie START to miasto startowe, a KONIEC to miasto docelowe.
    Na przykład: przejazd Warszawa Katowice`;

    return { "text": description }
}

// Handles messaging_postbacks events
function handlePostback(sender_psid: any, received_postback: any) {
    let response;

    // Get the payload for the postback
    let payload = received_postback.payload;

    try {
        payload = JSON.parse(payload);
    } catch (err) {
        console.error("payload is not a json object");
    }
    // Set the response based on the postback payload
    if (payload === 'yes') {
        response = { "text": "Thanks!" }
    } else if (payload === 'no') {
        response = { "text": "Oops, try sending another image." }
    } else if (payload.type === 'search') {
        if (payload.value === 'yes') {
            response = { "text": "Ha! Dobry jestem B)" }
        } else if (payload.value === 'no') {
            response = { "text": "Uops." }
        }
    }
    // Send the message to acknowledge the postback
    callSendAPI(sender_psid, response);
}

// Sends response messages via the Send API
function callSendAPI(sender_psid: any, response: any) {
    // Construct the message body
    let request_body = {
        "messaging_type": "RESPONSE",
        "recipient": {
            "id": sender_psid
        },
        "message": response
    }

    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v2.11/me/messages",
        "qs": { "access_token": PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
            console.log('message sent!')
        } else {
            console.error("Unable to send message:" + err);
        }
    });
}