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
    db.add(body);
    res.status(200).send('SUBSCRIBED');
})

app.delete('/subscribe', (req, res) => {
    let body: IRouteSubscription = req.body;
    db.add(body);
    res.status(200).send('SUBSCRIBED');
})

app.get('/subscriptions', (req, res) => {
    res.status(200).send(db.getAll());
})

app.post('/notify', async (req, res) => {
    let body: IRouteSubscription = req.body;
    let cities = await CitiesProvider.getCities();
    let [fromCity] = cities.filter(city => city.cityId === body.from);
    let [toCity] = cities.filter(city => city.cityId === body.to);
    const fb = new FacebookService();


    let response = {
        "dynamic_text": {
            "text": `Hej, {{first_name}}! Pojawił się przejazd na trasie ${fromCity.name} - ${toCity.name}`,
            "fallback_text": `Hej! Pojawił się przejazd na trasie ${fromCity.name} - ${toCity.name}`
        }
    };
    await fb.sendNotificaiton(body.subscriber, response);
    const routeResponse = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": `${fromCity.name} - ${toCity.name}`,
                        "subtitle": "Imie i nazwisko kierwocy, data",
                        "default_action": {
                            "type": "web_url",
                            "url": `https://givealift.herokuapp.com/route/${body.routeId}`,
                            "messenger_extensions": "FALSE",
                            "webview_height_ratio": "COMPACT"
                        },
                        "buttons": [
                            {
                                "type": "web_url",
                                "url": `https://givealift.herokuapp.com/route/${body.routeId}`,
                                "title": "Szczegóły"
                            }
                        ]
                    }
                ],
            }
        }

    }
    await fb.sendNotificaiton(body.subscriber, routeResponse);
    res.status(200).send("NOTIFIED");
})