import express from "express";
import bodyParser from "body-parser";
import { handleVerification } from "./auth";
import { MessageHandler } from "./message-handler";
import { CitiesProvider } from "./cities.provider";

const PAGE_ACCESS_TOKEN = process.env.BOT_PAGE_ACCESS_TOKEN;
const PORT = process.env.PORT || 1337;

const app = express();
const handler: MessageHandler = new MessageHandler();

app.use(bodyParser.json());

app.listen(PORT, async () => {
    console.log(`webhook is listening on port ${PORT}`);
    await CitiesProvider.initialize();
    console.log("City provider initialised");
});

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
            console.log("incoming message", webhook_event);

            // Get the sender PSID
            let sender_psid = webhook_event.sender.id;
            console.log('Sender PSID: ' + sender_psid);

            handler.handle(webhook_event);
        });

        // Returns a '200 OK' response to all requests
        res.status(200).send('EVENT_RECEIVED');
    } else {
        // Returns a '404 Not Found' if event is not from a page subscription
        res.sendStatus(404);
    }
});