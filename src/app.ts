import express from "express";
import bodyParser from "body-parser";
import { handleVerification } from "./fb-auth";
import { messageHandler as handler } from "./message-handler";
import { CitiesProvider } from "./_services/cities.provider";
import { database as db } from './_services/database';
import { FacebookService } from "./_services/fb.service";
import { IRouteSubscription } from "./_interfaces/route-subscription";

const PAGE_ACCESS_TOKEN = process.env.BOT_PAGE_ACCESS_TOKEN;
const PORT = process.env.PORT || 1337;

const app = express();

app.use(bodyParser.json());

app.listen(PORT, () => {
    console.log(`webhook is listening on port ${PORT}`);
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
            handler.handle(webhook_event);
        });

        // Returns a '200 OK' response to all requests
        res.status(200).send('EVENT_RECEIVED');
    } else {
        // Returns a '404 Not Found' if event is not from a page subscription
        res.sendStatus(404);
    }
});

app.post('/subscribe', (req, res) => {
    let body: IRouteSubscription = req.body;
    db.subscribers.insert(body);
    res.status(200).send('SUBSCRIBED');
})

app.delete('/subscribe', async (req, res) => {
    let body: IRouteSubscription = req.body;
    db.subscribers
        .remove(db.subscribers.where(subscription => {
            return subscription.subscriber === body.subscriber &&
                subscription.toCityId === body.toCityId &&
                subscription.fromCityId == body.fromCityId
        }))
    res.status(200).send("DELETED");
})

app.get('/subscriptions', (req, res) => {
    res.status(200).send(db.subscribers.data);
})

app.get('/cities', (req, res) => {
    res.status(200).send(db.cities.data);
})

app.post('/notify', async (req, res) => {
    const body: IRouteSubscription = req.body;
    try {
        handler.handle({ notification: body, sender: { id: body.subscriber } });
        res.status(200).send("NOTIFIED");
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
})