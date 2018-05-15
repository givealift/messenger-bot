import { responseBuilder } from "./response-builder";
import { Route } from './_models/route';
import { FacebookService } from './_services/fb.service';
import { APIService } from './_services/api.service';
import { INSTRUCTIONS, UNKNOWN_COMMAND, PARSE_ERROR } from "./static-responses";
import { default as moment, Moment } from 'moment';
import { IRouteParams } from "./_interfaces/route-params";
import { ITextResponse, IListResponse } from "./_interfaces/responses";
import { startsWith } from "./utils";
import { IRouteSubscription, INewRouteNotification } from "./_interfaces/route-subscription";
import { CitiesProvider } from "./_services/cities.provider";
import { database } from "./_services/database";

type TextType =
    "help"
    | "search"
    | "subscribe"
    | "cancel-subscription"
    | "link"
    | "emoticon"
    | "XD"
    | "unknown"

class MessageHandler {

    private readonly HOME_URL = "https://givealift.herokuapp.com";
    private readonly instructions = INSTRUCTIONS;
    private readonly unknownCommand = UNKNOWN_COMMAND;

    private fb = new FacebookService();
    private api = new APIService();

    constructor() { }

    public handle(webhook_event: any) {
        const sender_psid = webhook_event.sender.id;
        if (webhook_event.message) {
            this.handleMessage(sender_psid, webhook_event.message);
            return;
        }
        if (webhook_event.postback) {
            this.handlePostback(sender_psid, webhook_event.postback);
            return;
        }
        if (webhook_event.notifications) {
            this.handleNotifications(webhook_event.notifications);
            return;
        }
    }

    private async handleMessage(sender_psid: string, received_message: any) {
        let response;
        let incomingMessage: string = received_message.text;
        await this.fb.sendAction("mark_seen", sender_psid);
        await this.fb.sendAction("typing_on", sender_psid);
        switch (this.typeOf(incomingMessage)) {
            case "help":
                response = this.getHelpResponse();
                console.debug("Responding with: help");
                break;
            case "link":
                response = this.getLinkResponse();
                console.debug("Responding with: link");
                break;
            case "emoticon":
                response = this.getEmoticonResponse(incomingMessage);
                console.debug("Responding with: emoticon");
                break;
            case "XD":
                response = this.getXDResponse(incomingMessage);
                console.debug("Responding with: xD");
                break;
            case "search":
                response = await this.getSearchResponse(incomingMessage);
                console.debug("Responding with: list");
                break;
            case "subscribe":
                response = await this.getSubscribeResponse(sender_psid, incomingMessage);
                break;
            case "cancel-subscription":
                response = await this.getCancelledSubscriptionResponse(sender_psid, incomingMessage);
                break;
            default:
                response = this.getNotSupportedResponse(incomingMessage);
                console.debug("Responding with: unknown");
        }
        this.fb.sendResponse(sender_psid, response);
    }

    private typeOf(text: string): TextType {
        switch (true) {
            case /[xX][D+d+]/.test(text):
                return "XD";
            case /[:;B][\)\(\/\|]/.test(text):
                return "emoticon";
            case text.toLowerCase() === "pomoc" || text.toLowerCase() === "instrukcja":
                return "help";
            case text.toLowerCase().startsWith("przejazd"):
                return "search";
            case text.toLowerCase() === "link":
                return "link";
            case text.toLocaleLowerCase().startsWith("powiadom"):
                return "subscribe";
            case startsWith("anuluj")(text):
                return "cancel-subscription";
            default:
                return "unknown"
        }
    }

    private getHelpResponse(): ITextResponse {
        return responseBuilder.text(this.instructions);
    }

    private getLinkResponse(): ITextResponse {
        return responseBuilder.text(this.HOME_URL);
    }

    private getXDResponse(text: string): ITextResponse {
        const response = text.length < 30 ? text + text[text.length - 1] : "Opanuj się.";
        return responseBuilder.text(response);
    }

    private getEmoticonResponse(emoticon: string): ITextResponse {
        return responseBuilder.text(emoticon);
    }

    private getNotSupportedResponse(text: string): ITextResponse {
        return responseBuilder.text(this.unknownCommand(text))
    }

    private async getSearchResponse(text: string): Promise<IListResponse | ITextResponse> {
        const dateFormat = "YYYY-MM-DD";
        const params: IRouteParams = this.extractParamsFromText(text);
        if (!params) {
            return responseBuilder.text(PARSE_ERROR);
        }
        const searchResults: Route[] = await this.search(params);

        if (searchResults.length === 0) {
            return responseBuilder.text("Niestety nic nie znalazłem :(.");
        }

        if (searchResults.length === 1) {
            return responseBuilder.subscribedRoute(searchResults[0]);
        }

        const list = responseBuilder.list();
        list.addElements(searchResults);

        if (searchResults.length > 4) {
            let date = params.date ? params.date.format(dateFormat) : searchResults[0].from.date;
            list.addButton({
                "type": "web_url",
                "url": `https://givealift.herokuapp.com/route-list?from=${params.from}&to=${params.to}&date=${date}`,
                "title": "Szukaj dalej"
            })
        }
        return list.build();
    }

    private async getSubscribeResponse(sender_psid: string, text: string): Promise<ITextResponse> {
        const params = this.extractParamsFromText(text);
        if (!params) {
            return responseBuilder.text(PARSE_ERROR);
        }
        const response = await this.api.subscribeForNotification(sender_psid, params)
        if (response) {
            return responseBuilder.text(`Przyjąłem. Powiadomię Cię jak tylko pojawi się przejazd na trasie ${params.from} - ${params.to}`);
        }
        return responseBuilder.text('Sorki, chyba mam jakieś zwarcie, :/ Spróbuj ponownie później.');
    }

    private async getCancelledSubscriptionResponse(sender_psid: string, text: string): Promise<ITextResponse> {
        const params = this.extractParamsFromText(text);
        if (!params) {
            return responseBuilder.text(PARSE_ERROR);
        }
        const response = await this.api.cancelSubscription(sender_psid, params);
        if (response === 'DELETED') {
            return responseBuilder.text(`Okej, nie będę Cię informował o przejazdach na trasie ${params.from} - ${params.to}`);
        }
        return responseBuilder.text('Okej, Nie ma sprawy.');
    }

    private extractParamsFromText(text: string): IRouteParams {
        text = text
            .replace(/\s\s+/g, ' ') // Remove duplicated white spaces.
            .replace(/ z | do /g, " "); // Trim ' z ' ' do ' as they're just to make query more natural.

        let [przejazd, from, to, dateString] = text.split(" ");

        let date: Moment = dateString ? moment(dateString) : null;

        if (!(from && to)) {
            return null;
        }
        return {
            from: from,
            to: to,
            date: date
        }
    }

    private async search({ from, to, date }: IRouteParams): Promise<Route[]> {
        const dateFormat = "YYYY-MM-DD";

        console.log("debug| search for:", from, to, date);

        if (from && to) {
            if (date) {
                return await this.api.searchRoutes(from, to, date.format(dateFormat))
            }

            let response;
            response = await Promise.all(
                [
                    this.api.searchRoutes(from, to, moment().format(dateFormat)),
                    this.api.searchRoutes(from, to, moment().add(1, "day").format(dateFormat)),
                    this.api.searchRoutes(from, to, moment().add(2, "day").format(dateFormat))
                ]
            );
            response = response.reduce((a, b) => a.concat(b), []);
            return response;
        }
        return [];
    }

    // ================ NOTIFICATION handling ================

    private async handleNotifications(notifications: INewRouteNotification[]) {
        const routeId = notifications[0].routeId;
        let route = await this.api.getRoute(routeId);

        if (!route) {
            throw new Error(`ROUTE_NOT_FOUND [routeId: ${routeId}]`);
        }

        const subscribers = notifications.map(notification => notification.subscriber);

        await Promise.all(subscribers.map(async subscriber => {
            const routeResponse = responseBuilder.subscribedRoute(route);
            const announcement = responseBuilder.routeAnnouncment(route.from.city.name, route.to.city.name);
            await this.fb.sendNotificaiton(subscriber, announcement);
            await this.fb.sendNotificaiton(subscriber, routeResponse);
        }))
    }

    // ================ POSTBACK handling ================

    private handlePostback(sender_psid: string, received_postback: any) {
        let response;

        // Get the payload for the postback
        let payload = received_postback.payload;

        try {
            payload = JSON.parse(payload);
        } catch (err) {
            console.error("payload is not a json object");
        }
        // Set the response based on the postback payload
        if (payload.type === 'search') {
            if (payload.value === 'yes') {
                response = { "text": "Ha! Dobry jestem B)" }
            } else if (payload.value === 'no') {
                response = { "text": "Uops." }
            }
        }
        // Send the message to acknowledge the postback
        this.fb.sendResponse(sender_psid, response);
    }
}

export const messageHandler = new MessageHandler();